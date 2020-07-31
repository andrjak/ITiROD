"use strict"

import MyMusicControler from "../../actions/MyMusicControler.js";

let MyMusic = {
    render : async () => {
        let view =  /*html*/
        `
        <article class="card card-right">
            <ul id="my-playlist" class="playlist">

            </ul>
        </article>

        <article class="card card-right">
            <ul id="recommend-playlist" class="playlist">

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