// Global Variables
const body = document.getElementById('body');

let searchTerm = 'illiterate+light';
let parameterKeyValue = `media=music&term=${searchTerm}`;
let fetchURL = `https://itunes.apple.com/search?${parameterKeyValue}`;

console.log(`fetchURL: ${fetchURL}`);

getResults(fetchURL);
console.log(`post getResults() call`);

// ---------------------------------------------
//Functions

// API call to itunes
function getResults(fetchURL) {
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

// Creates search results
function createResults(data) {
    console.log(`function main() called successfully`);

    for (let i = 0; i < 10; i++) {
        
        // Result element
        let resultElement = document.createElement('div');
        resultElement.classList.add('result');
        results.appendChild(resultElement);

        // Album img
        let resultImg = document.createElement('img');
        resultImg.classList.add('album_artwork');
        resultImg.src = data.results[i].artworkUrl100;
        resultElement.appendChild(resultImg);

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

// Formats user input search query for API call
function formatQueryString(x){
    // Replace spaces between words with '+' and cut whitespace off front & back
}

console.log('this log is follows all functions');




/* --------------------------------------------

Notes

event.preventDefault() ... so console doesn't reload upon every submit

*/