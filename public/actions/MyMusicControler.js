"use strict"

import songElementCreater from "../views/components/SongElement.js";
import Song from "../views/components/Song.js";
import Utils from "./Utils.js";

function init ()
{
    const baseImage = "../source/music_base.png";

    let myMusicPlaylistElement   = document.getElementById("my-playlist");
    let recommendPlaylistElement = document.getElementById("recommend-playlist");
    let addButton = document.getElementById("create-new-song-button");
    
    let myMusicPlaylist = [];
    let recommendPlaylist = [];
    
    if (window.userPlaylist !== undefined) // Если пользовательский плейлист уже создан то используем его
    {
        myMusicPlaylist = window.userPlaylist;
    }
    else // Если пользовательский плейлист ещё не создан получаем его из бд
    {
        Utils.bdUserPlaylistLoad(undefined, () => { myMusicPlaylist = window.userPlaylist; });
    }

    addButton.addEventListener("click", event =>
    {
        modalPageControler("create");
    });

    function playlistInit() // Стартовая прогрузка элементов плейлиста (вынести html в отдельную функцию)
    {
        let position = 0;
        for (let item of myMusicPlaylist)
        {
            let elem = songElementCreater(
                position,
                item.trackPatch,
                baseImage,
                item.trackName,
                item.autor);
            myMusicPlaylistElement.append(elem);

            if (item.imagePatch !== undefined && item.imagePatch !== null && item.imagePatch !== "")
            {
                Utils.setSourceFromStorage(item.imagePatch, elem.querySelector("img"));
            }
            position++;
        }

        for (let item of recommendPlaylist)
        {
            // let elem = songElementCreater(position, item.trackPatch, item.imagePatch, item.trackName, item.autor);
            // recommendPlaylistElement.append(elem);
            // position++;
        }
    }

    function addButtonHandler()
    {

    }

    // Возможность изменять информацию о записи если пользователь является её владельцем
    function optionButtonHandler()
    {

    }

    // Удаление из пользовательского плейлиста (из БД не удаляется, т.к. эту запись могут использовать другие пользователи)
    function deleteButtonHandler()
    {

    }

    // Переход на страницу CurrentPlaylist с установкой выбранной записи и всех последующих из плейлиста
    function playButtonHandler()
    {

    }

    playlistInit();

}

export default init;
