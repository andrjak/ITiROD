function songElementCreater(position, trackPatch, imagePatch, trackName, autor, status)
{
    let elem = document.createElement("li");
    elem.playlistPosition = position;
    elem.trackPatch = trackPatch;
    elem.classList.add("playlist-item");
    elem.innerHTML = 
    `<img class="playlist-item-img" src="` + imagePatch + `" alt="song cover">
    <div class="song-track-info">
        <div class="track-name">` + trackName + `</div>
        <em class="autor-name">` + autor + `</em>
    </div>
    <div class="song-ctrl-btn-group">
        <button class="song-ctrl-btn button" name="play" alt="play">
            <i class="fas fa-play"></i>
        </button>
        <button class="song-ctrl-btn button" name="add" alt="add">
            <i class="fas fa-plus"></i>
        </button>
        <button class="song-ctrl-btn button" name="options" alt="options">
            <i class="fas fa-ellipsis-v"></i>
        </button>
    </div>`;

    return elem;
}

export default songElementCreater;