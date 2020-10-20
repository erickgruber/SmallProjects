// The de - facto unbiased shuffle algorithm is the Fisher - Yates(aka Knuth) Shuffle.

// See https: //github.com/coolaj86/knuth-shuffle

// You can see a great visualization here(and the original post linked to this)

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}