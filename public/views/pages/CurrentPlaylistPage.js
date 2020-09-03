"use strict"

import AudioControler from "../../actions/AudioControler.js";

let CurrentPlaylist = {
    render : async () => {
        let view =
        `
        <article class="card card-left">
            <div class="player">
                <img id="player-img" class="player-img" src="../source/music_base.png" alt="song cover"/>
                <div class="player-body">
                    
                    <div class="track-info" id="player-track">
                        <div class="track-text-info">
                            <b id="track-name"></b>
                            <em id="autor-name"></em>
                        </div>
                        <div id="s-area">
                            <div id="ins-time"></div>
                            <div id="s-hover"></div>
                            <div id="seek-bar"></div>
                        </div>
                        <div id="track-time">
                            <div id="current-time"></div>
                            <div id="track-length"></div>
                        </div>
                    </div>

                    <div class="player-btn-group">
                        <button class="button" id="play-previous">
                        <i class="fas fa-backward"></i>
                        </button>

                        <button class="button" id="play-pause-button">
                        <i class="fas fa-play"></i>
                        </button>

                        <button class="button" id="play-next">
                        <i class="fas fa-forward"></i>
                        </button>

                        <button class="button" id="play-mix">
                            <i class="fas fa-random"></i>
                        </button>

                        <button class="button" id="play-repeat">
                            <i class="fas fa-redo-alt"></i>
                        </button>
                    </div>

                </div>
            </div>
        </article>

        <article class="card card-right">
            <ul id="playlist" class="playlist">

            </ul>
        </article>
        `
        return view
    },
    after_render : async () => 
    {
        await AudioControler();
    }
}

export default CurrentPlaylist;