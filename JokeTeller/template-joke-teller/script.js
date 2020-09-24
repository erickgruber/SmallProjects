const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}
// Passing JOKE to VoiceRSS API
function tellMe(joke) {
    // console.log('tell me a joke ', joke);

    function test() {
        VoiceRSS.speech({
            key: 'ae4056df059e41d7b149990e7f3f274a',
            src: `${joke}`,
            hl: 'en-us',
            v: 'Linda',
            r: 0,
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        });
    }

    test();
}
// Get jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        // console.log('Respons', response);
        // converted to JSON data value
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ...${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);
        // Disable Buton
        toggleButton();
        console.log(joke);
        // console.log('Data', data.joke);

    } catch (error) {
        // Catch errors
        console.log('Error Erick: ', error)
    }
}
// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);