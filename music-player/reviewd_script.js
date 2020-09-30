// https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#Differences_from_innerText

const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const shuffleBtn = document.getElementById('shuffle');

// Music
const songs = [{
        name: 'jacinto-1',
        displayName: ' Electric Chill Machine',
        artist: 'Jacinto Design 1'
    },
    {
        name: 'jacinto-2',
        displayName: ' Seven Nation Army',
        artist: 'Jacinto Design 2'
    },
    {
        name: 'jacinto-3',
        displayName: ' Goodnight Disco Queen',
        artist: 'Jacinto Design 3 '
    },
    {
        name: 'metric-1',
        displayName: 'Metric',
        artist: 'Jacinto Design 4'
    }
];

// Check if Playing

let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('Pause', 'title');
    isPlaying = false;
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Shuffle Song

function shuffleSong() {
    let shuffleMusic = Math.floor(Math.random(songs.length) * 4);
    console.log(shuffleMusic);
    let songIndex = shuffleMusic;
    loadSong(songs[songIndex]);
    playSong();
}

// On Load -Select First Song

loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // console.log(duration, currentTime);
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        // console.log(progressPercent);
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        // Delay switching duration element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        //  Calculate display for currentTime
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    // console.log(e);
    const width = this.clientWidth;
    console.log(width);
    const clickX = e.offsetX;
    console.log('click', clickX);
    const { duration } = music;
    console.log(clickX / width);
    music.currentTime = ((clickX / width) * duration);
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
shuffleBtn.addEventListener('click', shuffleSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);