"use strict"

import songElementCreater from "../views/components/SongElement.js";
import Song from "../views/components/Song.js";

function init (myMusicPlaylist, recommendPlaylist)
{
    const baseImage = "../source/music_base.png";

    var myMusicPlaylistElement   = document.getElementById("my-playlist");
    var recommendPlaylistElement = document.getElementById("recommend-playlist");

    myMusicPlaylist = [new Song(false, "Dawn", "Skylike", "http://k003.kiwi6.com/hotlink/hshjwmwndw/2.mp3", baseImage, "79821843rt@gmail.com", "1"),
    new Song(false, "Me & You", "Alex Skrindo", "https://k003.kiwi6.com/hotlink/2rc3rz4rnp/1.mp3", "D:/Image/Windows.png", "79821843rt@gmail.com", "1"),
    new Song(false, "Dawn", "Skylike", "http://k003.kiwi6.com/hotlink/hshjwmwndw/2.mp3", baseImage, "79821843rt@gmail.com", "1"),
    new Song(false, "Me & You", "Alex Skrindo", "https://k003.kiwi6.com/hotlink/2rc3rz4rnp/1.mp3", "D:/Image/Windows.png", "79821843rt@gmail.com", "1"),
    new Song(false, "Dawn", "Skylike", "http://k003.kiwi6.com/hotlink/hshjwmwndw/2.mp3", baseImage, "79821843rt@gmail.com", "1"),
    new Song(false, "Me & You", "Alex Skrindo", "https://k003.kiwi6.com/hotlink/2rc3rz4rnp/1.mp3", "D:/Image/Windows.png", "79821843rt@gmail.com", "1"),
    new Song(false, "Dawn", "Skylike", "http://k003.kiwi6.com/hotlink/hshjwmwndw/2.mp3", baseImage, "79821843rt@gmail.com", "1"),
    new Song(false, "Me & You", "Alex Skrindo", "https://k003.kiwi6.com/hotlink/2rc3rz4rnp/1.mp3", "D:/Image/Windows.png", "79821843rt@gmail.com", "1")];//!!! Временная строка

    recommendPlaylist = [new Song(false, "Dawn", "Skylike", "http://k003.kiwi6.com/hotlink/hshjwmwndw/2.mp3", baseImage, "79821843rt@gmail.com", "1"),
    new Song(false, "Me & You", "Alex Skrindo", "https://k003.kiwi6.com/hotlink/2rc3rz4rnp/1.mp3", "D:/Image/Windows.png", "79821843rt@gmail.com", "1"),
    new Song(false, "Dawn", "Skylike", "http://k003.kiwi6.com/hotlink/hshjwmwndw/2.mp3", baseImage, "79821843rt@gmail.com", "1"),
    new Song(false, "Me & You", "Alex Skrindo", "https://k003.kiwi6.com/hotlink/2rc3rz4rnp/1.mp3", "D:/Image/Windows.png", "79821843rt@gmail.com", "1"),
    new Song(false, "Dawn", "Skylike", "http://k003.kiwi6.com/hotlink/hshjwmwndw/2.mp3", baseImage, "79821843rt@gmail.com", "1"),
    new Song(false, "Me & You", "Alex Skrindo", "https://k003.kiwi6.com/hotlink/2rc3rz4rnp/1.mp3", "D:/Image/Windows.png", "79821843rt@gmail.com", "1"),
    new Song(false, "Dawn", "Skylike", "http://k003.kiwi6.com/hotlink/hshjwmwndw/2.mp3", baseImage, "79821843rt@gmail.com", "1"),
    new Song(false, "Me & You", "Alex Skrindo", "https://k003.kiwi6.com/hotlink/2rc3rz4rnp/1.mp3", "D:/Image/Windows.png", "79821843rt@gmail.com", "1")];//!!! Временная строка

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

    function run()
    {
        playlistInit();
    }

    run();
}

export default init;
