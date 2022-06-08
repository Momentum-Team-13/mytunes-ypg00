listenForQuery()

// Event listeners
function listenForQuery(){
    const body_element = document.getElementById('body_element')
    const audio_element = document.getElementById('audio_element')

    search_bar.addEventListener('submit', (e) => {
        e.preventDefault()
        fetchItunesData()
    })  
    search_button.addEventListener('click', (e) => {
        e.preventDefault()
        fetchItunesData()
    })
    results_element.addEventListener('click', (e) => {
        audio_element.src = e.target.nextElementSibling.innerText
        audio_element.play()
    })
}

// API call to itunes
function fetchItunesData(){
    clearPreviousResults()
    let fetchURL = createFetchURL()

    fetch(fetchURL, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(function (response) {
        console.log(response)
        return response.json()
    })
    .then(function (data) {
        console.log(data)
        console.log('API fetch was successful.')
        createResults(data)
    })
    .catch(err => {
        console.error(err)
    })
}

// Creates result elements & fills them with fetch data
function createResults(data){
    let numResultsToDisplay = 45

    for (let i = 0; i < numResultsToDisplay; i++){
        
        // Result element (Parent for everything below)
        let result = document.createElement('div')
        result.classList.add('result_box')
        results_element.appendChild(result)
        
        // Album img
        let albumArtwork = document.createElement('img')
        albumArtwork.classList.add('album_artwork', 'result_item')
        albumArtwork.src = data.results[i].artworkUrl100
        result.appendChild(albumArtwork)
        
        // Hidden Div
        let audioSource1 = document.createElement('div')
        audioSource1.classList.add('audio_source')
        audioSource1.innerText = data.results[i].previewUrl
        result.appendChild(audioSource1)
        
        // Track name
        let trackName = document.createElement('div')
        trackName.classList.add('track_name', 'result_item')
        trackName.innerText = data.results[i].trackName
        result.appendChild(trackName)
        
        // Hidden Div
        let audioSource2 = document.createElement('div')
        audioSource2.classList.add('audio_source')
        audioSource2.innerText = data.results[i].previewUrl
        result.appendChild(audioSource2)
        
        // Band name
        let artistName = document.createElement('div')
        artistName.classList.add('artist_name', 'result_item')
        artistName.innerText = data.results[i].artistName
        result.appendChild(artistName)
        
        // Hidden Div
        let audioSource3 = document.createElement('div')
        audioSource3.classList.add('audio_source')
        audioSource3.innerText = data.results[i].previewUrl
        result.appendChild(audioSource3)
    }

    console.log('Finished loading search results.')
}

// Clear previous results
function clearPreviousResults(){
    results_element.innerHTML = ''
}

// Concatinates together fetchURL
function createFetchURL(){
    // input = document.querySelector('#input')

    const itunesApiURL = 'https://itunes.apple.com/search?'
    const parameterKeyValue = 'media=music&term='
    const searchTerm = input.value
    const fetchURL = itunesApiURL + parameterKeyValue + searchTerm
    
    console.log(`fetchURL: ${fetchURL}`)

    return fetchURL
}