"use strict"

import songElementCreater from "../views/components/SongElement.js";
import Song from "../views/components/Song.js";

function init ()
{
    let myMusicPlaylistElement   = document.getElementById("my-playlist");
    let recommendPlaylistElement = document.getElementById("recommend-playlist");

    // myMusicPlaylist = [new Song(false, "Dawn", "Skylike", "http://k003.kiwi6.com/hotlink/hshjwmwndw/2.mp3", baseImage, "79821843rt@gmail.com", "1"),
    // new Song(false, "Me & You", "Alex Skrindo", "https://k003.kiwi6.com/hotlink/2rc3rz4rnp/1.mp3", "D:/Image/Windows.png", "79821843rt@gmail.com", "1"),
    // new Song(false, "Dawn", "Skylike", "http://k003.kiwi6.com/hotlink/hshjwmwndw/2.mp3", baseImage, "79821843rt@gmail.com", "1"),
    // new Song(false, "Me & You", "Alex Skrindo", "https://k003.kiwi6.com/hotlink/2rc3rz4rnp/1.mp3", "D:/Image/Windows.png", "79821843rt@gmail.com", "1"),
    // new Song(false, "Dawn", "Skylike", "http://k003.kiwi6.com/hotlink/hshjwmwndw/2.mp3", baseImage, "79821843rt@gmail.com", "1"),
    // new Song(false, "Me & You", "Alex Skrindo", "https://k003.kiwi6.com/hotlink/2rc3rz4rnp/1.mp3", "D:/Image/Windows.png", "79821843rt@gmail.com", "1"),
    // new Song(false, "Dawn", "Skylike", "http://k003.kiwi6.com/hotlink/hshjwmwndw/2.mp3", baseImage, "79821843rt@gmail.com", "1"),
    // new Song(false, "Me & You", "Alex Skrindo", "https://k003.kiwi6.com/hotlink/2rc3rz4rnp/1.mp3", "D:/Image/Windows.png", "79821843rt@gmail.com", "1")];//!!! Временная строка

    // recommendPlaylist = [new Song(false, "Dawn", "Skylike", "http://k003.kiwi6.com/hotlink/hshjwmwndw/2.mp3", baseImage, "79821843rt@gmail.com", "1"),
    // new Song(false, "Me & You", "Alex Skrindo", "https://k003.kiwi6.com/hotlink/2rc3rz4rnp/1.mp3", "D:/Image/Windows.png", "79821843rt@gmail.com", "1"),
    // new Song(false, "Dawn", "Skylike", "http://k003.kiwi6.com/hotlink/hshjwmwndw/2.mp3", baseImage, "79821843rt@gmail.com", "1"),
    // new Song(false, "Me & You", "Alex Skrindo", "https://k003.kiwi6.com/hotlink/2rc3rz4rnp/1.mp3", "D:/Image/Windows.png", "79821843rt@gmail.com", "1"),
    // new Song(false, "Dawn", "Skylike", "http://k003.kiwi6.com/hotlink/hshjwmwndw/2.mp3", baseImage, "79821843rt@gmail.com", "1"),
    // new Song(false, "Me & You", "Alex Skrindo", "https://k003.kiwi6.com/hotlink/2rc3rz4rnp/1.mp3", "D:/Image/Windows.png", "79821843rt@gmail.com", "1"),
    // new Song(false, "Dawn", "Skylike", "http://k003.kiwi6.com/hotlink/hshjwmwndw/2.mp3", baseImage, "79821843rt@gmail.com", "1"),
    // new Song(false, "Me & You", "Alex Skrindo", "https://k003.kiwi6.com/hotlink/2rc3rz4rnp/1.mp3", "D:/Image/Windows.png", "79821843rt@gmail.com", "1")];//!!! Временная строка


    let myMusicPlaylist;
    let recommendPlaylist;
    
    if (window.userPlaylist !== undefined) // Если пользовательский плейлист уже создан то используем его
    {
        myMusicPlaylist = window.userPlaylist;
    }
    else // Если пользовательский плейлист ещё не создан получаем его из бд
    {

    }

    function playlistInit() // Стартовая прогрузка элементов плейлиста (вынести html в отдельную функцию)
    {
        let position = 0;
        for (let item of myMusicPlaylist)
        {
            let elem = songElementCreater(position, item.trackPatch, item.imagePatch, item.trackName, item.autor);
            myMusicPlaylistElement.append(elem);
            position++;
        }

        for (let item of recommendPlaylist)
        {
            let elem = songElementCreater(position, item.trackPatch, item.imagePatch, item.trackName, item.autor);
            recommendPlaylistElement.append(elem);
            position++;
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
