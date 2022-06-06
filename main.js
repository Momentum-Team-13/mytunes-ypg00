// Global Variables
const body = document.getElementById('body');

let searchTerm = 'illiterate+light';

let parameterKeyValue = `media=music&term=${searchTerm}`;
let fetchURL = `https://itunes.apple.com/search?${parameterKeyValue}`;

console.log(`fetchURL: ${fetchURL}`);

// API call to itunes
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
    main(data);
})
.catch(err => {
    console.error(err);
});

// Main function, called in fetch()
function main(data) {
    console.log(`function main() called successfully.`);
    let xyz = data.results[0].artistName;
    console.log(`xyz: ${xyz}`);
}