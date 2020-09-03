"use strict"

function playlistElementCreater()
{
    let elem = 
    `<li class="scroler-item">
        <img class="album-img" src="../source/music_base.png" alt="Album cover"/>
        <div class="button-group">
            <button class="button" name="play" alt="play">
                <i class="fas fa-play"></i>
            </button>
            <button class="button" name="delete" alt="delete">
                <i class="fas fa-trash-alt"></i>
            </button>
            <button class="button" name="options" alt="options">
                <i class="fas fa-ellipsis-v"></i>
            </button>
        </div>
    </li>`
}