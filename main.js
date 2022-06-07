// Global Variables
const body = document.getElementById('body');
const audio = document.getElementById('audio');
let numResults = 45;
let searchTerm = '';
let parameterKeyValue = 'media=music&term=';
let fetchURL = 'https://itunes.apple.com/search?';

listenForQuery();

// Event listeners
function listenForQuery() {

    search_bar.addEventListener('submit', (e) => {
        clearPreviousResults();
        e.preventDefault();

        const input = document.querySelector('#input');
        searchTerm = input.value;
        fetchURL += parameterKeyValue + searchTerm;
    
        fetchItunesData();
    });

    search_button.addEventListener('click', (e) => {
        clearPreviousResults();
        e.preventDefault();

        const input = document.querySelector('#input');
        const inputTarget = e.target;
        if (inputTarget) {
            searchTerm = input.value;
            fetchURL += parameterKeyValue + searchTerm;

            fetchItunesData();
        }
    });

    results.addEventListener('click', (e) => {
        if (e.target.classList.contains('song_title')) {
            console.log(`e.target: ${e.target}`);
            audio.src = e.target.nextElementSibling.innerText;
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

// Creates results elements & fills them with query results
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

        // Hidden Div
        let audioSource = document.createElement('div');
        audioSource.classList.add('audio_source');
        audioSource.innerText = data.results[i].previewUrl;
        resultElement.appendChild(audioSource);

        // Band name
        let artistName = document.createElement('div');
        artistName.classList.add('artist_name');
        artistName.innerText = data.results[i].artistName;
        resultElement.appendChild(artistName);


    }
    console.log('Finished loading search results.');
}

// Clear previous results
function clearPreviousResults() {
    results.innerHTML = '';
}

// Formats user query input for the API call
function formatQueryString(x) {

}

/* ------ Notes --------

*/