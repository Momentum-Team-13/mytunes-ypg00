// Global Variables
const body = document.getElementById('body');
let numResults = 12;
let searchTerm = '';
let parameterKeyValue = 'media=music&term=';
let fetchURL = 'https://itunes.apple.com/search?';

pressReturn();
clickSearch();

// Event listeners
function pressReturn() {
    display.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.querySelector('#input');
        const display = document.querySelector('#display');
        searchTerm = input.value;
        // formatQueryString(searchTerm);
        fetchURL += parameterKeyValue + searchTerm;
    
        console.log(`input.value: ${input.value}`);
        console.log(`searchTerm: ${searchTerm}`)
        console.log(`parameterKeyValue: ${parameterKeyValue}`)
        console.log(`fetchURL before function call: ${fetchURL}`);
    
        fetchItunesData();
    });
}

function clickSearch() {
    search_button.addEventListener('click', (e) => {
        e.preventDefault();
        const input = document.querySelector('#input');
        const button = document.getElementById('#search_button');
        const inputTarget = e.target;
        if (inputTarget) {
            searchTerm = input.value;
            // formatQueryString(searchTerm);
            fetchURL += parameterKeyValue + searchTerm;
            fetchItunesData();
        }
    });
}

// API call to itunes
function fetchItunesData() {
    console.log(`fetchURL @ start of request: ${fetchURL}`);
    fetch(fetchURL, {
        "method": "GET",
        "headers": {
            "content-type": "application/json"
        }
    })
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        console.log(`API fetch was successful.`);
        createResults(data);
    })
    .catch(err => {
        console.error(err);
    });
}

// Creates elements & fills them with query results
function createResults(data) {
    for (let i = 0; i < numResults; i++) {
        
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

}