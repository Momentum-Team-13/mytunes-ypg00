// Global Variables
const body = document.getElementById('body');

let searchTerm = 'illiterate';

let parameterKeyValue = `media=music&term=${searchTerm}`;
let fetchURL = `https://itunes.apple.com/search?${parameterKeyValue}`;

// fetch(url, {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//   })
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(`API fetch was successful. Data: ${data}`);
//       createProfile(data);
//     });

fetch(fetchURL, {
    "method": "GET",
    "headers": {
        "content-type": "application/json"
    }
})
.then(response => {
    console.log(response);
    makePlayer(response);
})
.catch(err => {
    console.error(err);
});

function makePlayer(response) {
    let xyz = response.results[0].artistName
    console.log(`xyz: ${xyz}`);
}