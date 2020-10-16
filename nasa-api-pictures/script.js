const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// NASA API
const count = 10;
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

function showContent(page) {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (page === 'results') {
        resultsNav.classList.remove('hidden');
        favoritesNav.classList.add('hidden');
    } else {
        resultsNav.classList.add('hidden');
        favoritesNav.classList.remove('hidden');
    }
    loader.classList.add('hidden');
}

function createDOMNodes(page) {
    const currentArray = page === 'results' ? resultsArray : Object.values(favorites);
    console.log('currentArray', page, currentArray);
    // console.log(page);
    currentArray.forEach((result) => {
        // Card Container
        const card = document.createElement('div');
        card.classList.add('card');
        // Link
        const link = document.createElement('a');
        link.href = result.hdurl;
        link.title = 'View Full Image';
        link.target = '_blank';
        // Image
        const image = document.createElement('img');
        image.src = result.url;
        image.alt = 'Nasa Picture of the day';
        image.loading = 'lazy';
        image.classList.add('card-img-top');
        // Card-body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        // Card Title
        const cardTitle = document.createElement('h5');
        cardTitle.textContent = result.title;
        // Save Text
        const saveText = document.createElement('p');
        saveText.classList.add('clickable');
        if (page === 'results') {
            saveText.textContent = 'Add to Favorites';
            // saveText.onclick = `saveFavorite('${result.url}')`;
            saveText.setAttribute('onclick', `saveFavorite('${result.url}')`);
        } else {
            saveText.textContent = 'Remove Favorite';
            // saveText.onclick = `saveFavorite('${result.url}')`;
            saveText.setAttribute('onclick', `removeFavorite('${result.url}')`);
        }
        // Card text
        const cardText = document.createElement('p');
        cardText.textContent = result.explanation;
        // Footer Container
        const footer = document.createElement('small');
        footer.classList.add('text-muted');
        // Date
        const date = document.createElement('strong');
        date.textContent = result.date;
        // Copyright
        const copyrightResult = result.copyright === undefined ? '' : result.copyright;
        const copyright = document.createElement('span');
        copyright.textContent = ` ${copyrightResult}`;
        // Append
        footer.append(date, copyright);
        cardBody.append(cardTitle, saveText, cardText, footer);
        link.appendChild(image);
        card.append(link, cardBody);
        // console.log(card);
        imagesContainer.appendChild(card);
    });
}

// Update the DOM
function updateDOM(page) {
    console.log(page);
    // Get Favorites from localStorage
    if (localStorage.getItem('nasaFavorites')) {
        favorites = JSON.parse(localStorage.getItem('nasaFavorites'));
        console.log(favorites);
        showContent(page);
    }
    imagesContainer.textContent = '';
    createDOMNodes(page);
}

// Get 10 images from NASA API
async function getNasaPictures() {
    // Show Loader
    loader.classList.remove('hidden');
    try {
        const response = await fetch(apiUrl);
        resultsArray = await response.json();
        // console.log(resultsArray);
        updateDOM('results');
    } catch (error) {
        // Catch error
    }
}
// Addresult to FAvorites
function saveFavorite(itemUrl) {
    // console.log(itemUrl);
    // Loop through Results Array to select Favorite
    resultsArray.forEach((item) => {
        if (item.url.include(itemUrl) && !favorites[itemUrl]) {
            favorites[itemUrl] = item;
            // console.log(JSON.stringify(favorites));
            // Show Confirmation for 2s
            saveConfirmed.hidden = false;
            setTimeout(() => {
                saveConfirmed.hidden = true;
            }, 2000);
            // Set Favorites in Local Storage
            localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
        }
    });
}

// Remove items from favorites
function removeFavorite(itemUrl) {
    if (favorites[itemUrl]) {
        delete favorites[itemUrl];
        // Set Favorites in Local Storage
        localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
        updateDOM('favorites');
    }
}


// Load 
getNasaPictures();