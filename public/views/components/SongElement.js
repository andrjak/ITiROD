"use strict"

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
        <button class="button play-button-event">
            <i class="fas fa-play play-button-event"></i>
        </button>
        <button class="button add-button-event">
            <i class="fas fa-plus add-button-event"></i>
        </button>
        <button class="button options-button-event">
            <i class="fas fa-ellipsis-v options-button-event"></i>
        </button>
    </div>`;

    return elem;
}

export default songElementCreater;