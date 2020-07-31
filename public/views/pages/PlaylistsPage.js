"use strict"

import PlaylistsControler from "../../actions/PlaylistsControler.js";

let Playlists = {
    render : async () => {
        let view =
        `
            <ul class="scroler" id="scroler_list">
                <li class="scroler-item">
                    <div class="button-group playlist-button-group">
                        <button class="button playlist-button" name="play" alt="play">
                            <i class="fas fa-play"></i>
                        </button>
                        <button class="button playlist-button" name="delete" alt="delete">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                        <button class="button playlist-button" name="options" alt="options">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                    <div class="playlist-info">
                        <div class="playlist-name">playlist-name</div>
                        <em class="playlist-autor">playlist-autor</em>
                    </div>
                <li>
            </ul>
        `
        return view
    },
    after_render : async () => 
    {
        PlaylistsControler();
    }
}

export default Playlists;