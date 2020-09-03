"use strict"

import MyMusicControler from "../../actions/MyMusicControler.js";

let MyMusic = {
    render : async () => {
        let view =  /*html*/
        `
        <button id="create-new-song-button" class="modal-button">
            Add new song
        </button>
        <article class="card">
            <ul id="my-playlist" class="playlist user-play-list">

            </ul>
        </article>

        <article id="all-music" class="card">
            <ul id="recommend-playlist" class="playlist all-play-list">

            </ul>
        </article>
        `
        return view
    },
    after_render : async () => 
    {
        MyMusicControler();
    }
}

export default MyMusic;