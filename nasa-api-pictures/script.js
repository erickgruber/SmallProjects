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

// Update the DOM
function updateDOM() {
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

    });
}

// Get 10 images from NASA API
async function getNasaPictures() {
    try {
        const response = await fetch(apiUrl);
        resultsArray = await response.json();
        console.log(resultsArray);
        updateDOM();
    } catch (error) {
        // Catch error
    }
}
// Load 
getNasaPictures();