eventListeners()

function eventListeners() {
    search_bar.addEventListener('submit', (e) => {
        e.preventDefault()
        fetchItunesData()
    })  
    search_button.addEventListener('click', (e) => {
        e.preventDefault()
        fetchItunesData()
    })
    results_element.addEventListener('click', (e) => {
        let target = e.target
        playTrack(target)
    })
}

function fetchItunesData() {
    let fetchURL = createFetchURL()
    clearPreviousResults()
    
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
        renderSearchResults(data)
    })
    .catch(err => {
        console.error(err)
    })
}

function renderSearchResults(data) {
    const numResultsToDisplay = 45
    for (let i = 0; i < numResultsToDisplay; i++) {
        
        let resultBox = document.createElement('div')
        resultBox.classList.add('result_box')
        results_element.appendChild(resultBox)
        
        let albumArtwork = document.createElement('img')
        albumArtwork.classList.add('album_artwork', 'result_item')
        albumArtwork.src = data.results[i].artworkUrl100
        resultBox.appendChild(albumArtwork)
        
        let trackName = document.createElement('div')
        trackName.classList.add('track_name', 'result_item')
        trackName.innerText = data.results[i].trackName
        resultBox.appendChild(trackName)
        
        let artistName = document.createElement('div')
        artistName.classList.add('artist_name', 'result_item')
        artistName.innerText = data.results[i].artistName
        resultBox.appendChild(artistName)
        
        let audioSource = document.createElement('div')
        audioSource.classList.add('audio_source')
        audioSource.innerText = data.results[i].previewUrl
        resultBox.appendChild(audioSource)
    }
    console.log('Finished loading search results.')
}

function playTrack(target) {
    if (target.parentElement.classList.contains('result_box')) {
        audio_element.src = target.parentElement.children[3].innerText
    } else if (target.classList.contains('result_box')) {
        audio_element.src = target.children[3].innerText
    } 
    audio_element.play()
    console.log('Playing selected track')
}

function createFetchURL() {
    const itunesApiUrlBase = 'https://itunes.apple.com/search?'
    const parameterKeyValue = 'media=music&term='
    const searchTerm = input.value
    const fetchURL = itunesApiUrlBase + parameterKeyValue + searchTerm
    console.log(`fetchURL: ${fetchURL}`)
    return fetchURL
}

function clearPreviousResults() {
    results_element.innerHTML = ''
    input.value = ''
}