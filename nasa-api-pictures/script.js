const reultsNav = document.getElementById('resultNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const laoder = document.querySelector('.loader');

// NASA API
const count = 10;
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

function createDOMNodes(page) {
    console.log(page);
    resultsArray.forEach((result) => {
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
        saveText.textContent = 'Add to Favorites';
        // saveText.onclick = `saveFavorite('${result.url}')`;
        saveText.setAttribute('onclick', `saveFavorite('${result.url}')`);
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
    // Get Favorites from localStorage
    if (localStorage.getItem('nasaFavorites')) {
        favorites = JSON.parse(localStorage.getItem('nasaFavorites'));
        console.log(favorites);
    }
    createDOMNodes(page);
}

// Get 10 images from NASA API
async function getNasaPictures() {
    try {
        const response = await fetch(apiUrl);
        resultsArray = await response.json();
        // console.log(resultsArray);
        updateDOM('favorites');
    } catch (error) {
        // Catch error
    }
}
// Addresult to FAvorites
function saveFavorite(itemUrl) {
    // console.log(itemUrl);
    // Loop through Results Array to select Favorite
    resultsArray.forEach((item) => {
        if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
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


// Load 
getNasaPictures();