eventListeners()

function eventListeners() {
    document.getElementById('search_bar').addEventListener('submit', (e) => {
        e.preventDefault()
        fetchItunesData()
    })  
    document.getElementById('search_button').addEventListener('click', (e) => {
        e.preventDefault()
        fetchItunesData()
    })
    document.getElementById('results_display').addEventListener('click', (e) => {
        let target = e.target
        playTrack(target)
    })
}

function fetchItunesData() {
    const fetchURL = createFetchURL()
    console.log(`fetchURL prior to API call: ${fetchURL}`)

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
    const showingResultsDisplayText = document.getElementById('showing_results_text')
    const input = document.getElementById('input_search_bar')
    const resultsDisplay = document.getElementById('results_display')
    const numResultsToDisplay = 40

    showingResultsDisplayText.innerHTML = `<strong>Showing results for: </strong>${input.value}`
    clearPreviousQuery()

    for (let i = 0; i < numResultsToDisplay; i++) {
        
        let resultBox = document.createElement('div')
        resultBox.classList.add('result_box')
        resultsDisplay.appendChild(resultBox)
        
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
        
        let audioUrl = document.createElement('div')
        audioUrl.classList.add('audio_url')
        audioUrl.innerText = data.results[i].previewUrl
        resultBox.appendChild(audioUrl)
    }
    console.log('Finished loading search results.')
}

function playTrack(target) {
    const audioElement = document.getElementById('audio_element')
    const nowPlayingDisplay = document.getElementById('now_playing')

    if (target.parentElement.classList.contains('result_box')) {
        audioElement.src = target.parentElement.children[3].innerText
        nowPlayingDisplay.innerHTML = `<strong>Now playing: </strong>${target.parentElement.children[1].innerText} by ${target.parentElement.children[2].innerText}`
    } else if (target.classList.contains('result_box')) {
        audioElement.src = target.children[3].innerText
        nowPlayingDisplay.innerHTML = `<strong>Now playing: </strong>${target.children[1].innerText} by ${target.children[2].innerText}`
    } 
    audioElement.play()
    console.log('Playing selected track')
}

function createFetchURL() {
    const inputSearchBar = document.getElementById('input_search_bar')
    const itunesApiUrlBase = 'https://itunes.apple.com/search?'
    const parameterKeyValue = 'media=music&term='
    const searchTerm = inputSearchBar.value
    return itunesApiUrlBase + parameterKeyValue + searchTerm
}

function clearPreviousQuery() {
    document.getElementById('results_display').innerHTML = ''
    document.getElementById('input_search_bar').value = ''
}