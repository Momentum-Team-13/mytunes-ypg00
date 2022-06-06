// Global Variables
let searchTerm = 'illiterate+light';
const qtyOfResults = 12;

const body = document.getElementById('body');
const parameterKeyValue = `media=music&term=${searchTerm}`;
const fetchURL = `https://itunes.apple.com/search?${parameterKeyValue}`;

console.log(`fetchURL: ${fetchURL}`);

getResults();


// -------------- Functions ----------------

// API call to itunes
function getResults() {
    fetch(fetchURL, {
        "method": "GET",
        "headers": {
            "content-type": "application/json"
        }
    })
    .then(function (response) {
        console.log(`response: ${response}`);
        return response.json();
    })
    .then(function (data) {
        console.log(`API fetch was successful. Data: ${data}`);
        createhResults(data);
    })
    .catch(err => {
        console.error(err);
    });
}

// Creates elements & fills them with query results
function createResults(data) {
    for (let i = 0; i < qtyOfResults; i++) {
        
        // Result element
        let resultElement = document.createElement('div');
        resultElement.classList.add('result');
        results.appendChild(resultElement);

        // Album img
        let albumArtwork = document.createElement('img');
        albumArtwork.classList.add('album_artwork');
        albumArtwork.src = data.results[i].artworkUrl100;
        resultElement.appendChild(albumArtwork);

        // Track name
        let trackName = document.createElement('div');
        trackName.classList.add('song_title');
        trackName.innerText = data.results[i].trackName;
        resultElement.appendChild(trackName);

        // Band name
        let artistName = document.createElement('div');
        artistName.classList.add('artist_name');
        artistName.innerText = data.results[i].artistName;
        resultElement.appendChild(artistName);
    }
    console.log('Finished loading search results.');
}

// Formats user query input for the API call
function formatQueryString(x) {
    // Replace spaces between words with '+' and cut whitespace off front & back
}

/* --------------- Notes --------------------

event.preventDefault() ... so console doesn't reload upon every submit

*/