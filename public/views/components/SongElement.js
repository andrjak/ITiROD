"use strict"

function songElementCreater(position, trackPatch, imagePatch, trackName, autor, buttonType, status)
{
    let button;
    if (buttonType === "delete")
    {
        button = { button: "button delete-button-event", i: "fas fa-trash-alt delete-button-event" };
    }
    else
    {
        button = { button: "button add-button-event", i: "fas fa-plus add-button-event" };
    }

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
        <button class="` + button.button + `">
            <i class="` + button.i + `"></i>
        </button>
        <button class="button options-button-event">
            <i class="fas fa-ellipsis-v options-button-event"></i>
        </button>
    </div>`;

    return elem;
}

export default songElementCreater;