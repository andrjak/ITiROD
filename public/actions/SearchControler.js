"use strict"

import songElementCreater from "../views/components/SongElement.js";
import Utils from "./Utils.js";

async function searchControler()
{
    // let searchInput = document.getElementById("search-input");
    // let searchButton = document.getElementById("search-button");
    // let myMusicPlaylistElement   = document.getElementById("my-playlist");
    // let recommendPlaylistElement = document.getElementById("recommend-playlist");

    // let snapshotUserPlaylist = window.userPlaylist.slice();
    // let snapshotAllMusicPlaylist = window.allPlaylist.slice();

    // function search(event)
    // {
    //     let value = searchInput.value.trim().toUpperCase();

    //     if (value == "")
    //     {
    //         return;
    //     }

    //     if (window.userPlaylist)
    //     {
    //         myMusicPlaylistElement.innerHTML = "";
    //         let selectedUserMusic = [];
    //         position = 0;
    //         for (let item of window.userPlaylist)
    //         {
    //             if (item.autor.toUpperCase() == value || item.trackName.toUpperCase() == value)
    //             {
    //                 selectedUserMusic.push(item);
    //                 let elem = songElementCreater(
    //                     position,
    //                     item.trackPatch,
    //                     baseImage,
    //                     item.trackName,
    //                     item.autor,
    //                     "delete");
    //                 myMusicPlaylistElement.append(elem);
        
    //                 if (item.imagePatch !== undefined && item.imagePatch !== null && item.imagePatch !== "")
    //                 {
    //                     Utils.setSourceFromStorage(item.imagePatch, elem.querySelector("img"));
    //                 }
    //                 position++;
    //             }
    //         }
    //     }

    //     let selectedAllMusic = [];
    //     if (window.allPlaylist)
    //     {
    //         Utils.bdGlobalSearch(selectedAllMusic, value, () =>
    //         {
    //             recommendPlaylistElement.innerHTML("");
    //             position = 0;
    //             for (let item of selectedAllMusic)
    //             {
    //                 let elem = songElementCreater(
    //                     position,
    //                     item.trackPatch,
    //                     baseImage,
    //                     item.trackName,
    //                     item.autor,
    //                     "delete");
    //                 recommendPlaylistElement.append(elem);
            
    //                 if (item.imagePatch !== undefined && item.imagePatch !== null && item.imagePatch !== "")
    //                 {
    //                     Utils.setSourceFromStorage(item.imagePatch, elem.querySelector("img"));
    //                 }
    //                 position++;
    //              }
    //         });
    //     }
    // }

    // searchButton.addEventListener("click", search);

    // document.addEventListener('keydown', event =>
    // {
    //     if (event.keyCode === 13 && searchInput.value.trim() !== "") 
    //     {
    //         search(event);
    //     }
    // });

    // searchInput.addEventListener("change", () =>
    // {
    //     if (searchInput.value == "")
    //     {
    //         window.userPlaylist
    //     }
    // });
}

export default searchControler;