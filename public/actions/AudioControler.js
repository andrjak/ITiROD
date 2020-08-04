"use strict"

import Song from "../views/components/Song.js";
import Functions from "./AdditionalFunctions.js";
import songElementCreater from "../views/components/SongElement.js";

async function AudioControler() // Коллекция с музыкой получаемая из бд
{
    //Константы
    const baseImage = "../source/music_base.png";

    let currentPlaylist = [];
    // Информация о песне
    let trackImage  = document.getElementById("player-img");
    let trackName   = document.getElementById("track-name");
    let trackAutor  = document.getElementById("autor-name");
    let currentTime = document.getElementById("current-time");
    let trackLength = document.getElementById("track-length");

    // Управление воспроизведением
    let playPreviousButton = document.getElementById("play-previous");
    let playPauseButton    = document.getElementById("play-pause-button");
    let playNextButton     = document.getElementById("play-next");
    let playRepeatButton   = document.getElementById("play-repeat");
    let playMixButton      = document.getElementById("play-mix");

    // Линия прокрутки и всплывающая табличка
    let sArea   = document.getElementById("s-area");
    let insTime = document.getElementById("ins-time");
    let sHover  = document.getElementById("s-hover");
    let seekBar = document.getElementById("seek-bar");

    // Элементы отвечающие за изображение на кнопках (изменение после нажатия)
    let playPauseButtonStyle = playPauseButton.querySelector("i"); // Должно работать

    // Текущий плей лист
    let playlist = document.getElementById("playlist");

    let playlistItemList = [];
    let currentPlaylistItem = null;

    if (window.audio === undefined) // Ленивое создание глобальных переменных
    {
        window.audio = new Audio();
        window.currentTrackPosition = 0; // Номер текущей записи в плей листе
        window.selectedPosition = 0; // Позиция с которой воспроизоводится запись
        window.selectedTime = 0;

        let music = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("music");

        music.get().then((querySnapshot) =>
        {
            querySnapshot.forEach((songPatchDoc) => 
            {
                let currentDoc = firebase.firestore().doc(songPatchDoc.data().patch);
                currentDoc.get().then(async (doc) => 
                {
                    let item = doc.data();
                    currentPlaylist.push(new Song(item.status, item.songName, item.songAutor, item.songPatch, item.imagePatch, doc.id, "1"));
                    console.dir(currentPlaylist);//!!!
                    run();
                }).catch((error) =>
                {
                    console.log("Document error: " + error.message);
                });
            });
        }).catch((error) => 
        {
            console.log("Collection error: " + error.message);
        });
    }
    else
    {
        run();
    }

    function downloadFile(patch)
    {
        firebase.storage().refFromURL(patch).getDownloadURL().then(function(url) 
        {
            console.dir(url);//!!!
            return url;
        }).catch(function(error) 
        {
            alert("Download error: " + error.message);
        });
    }

    // Обработчики событий
    function playPause()
    {
        setTimeout(function()
        {
            if (audio.paused)
            {
                playPauseButtonStyle.className = "fas fa-pause";  // Меняем значение атрибута class в элементе i на fas fa-pause (значок паузы)
                audio.play();
            }
            else
            {
                playPauseButtonStyle.className = "fas fa-play"; // Меняем значение атрибута class в элементе i на fas fa-pause (значок запуска)
                audio.pause();
            }
        }, 300);
    }

    function updateTime()
    {
        // Продолжительность записи
        let durationMinutes = Math.floor(audio.duration / 60);
        let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);
        // Текущее время
        let currentMinutes = Math.floor(audio.currentTime / 60);
        let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);

        let playProgress = (audio.currentTime / audio.duration) * 100;

        // Если врямя - однозначное число добавляем 0 в начале
        currentMinutes = currentMinutes < 10 ? "0" + currentMinutes : currentMinutes;
        currentSeconds = currentSeconds < 10 ? "0" + currentSeconds : currentSeconds;
        durationMinutes = durationMinutes < 10 ? "0" + durationMinutes : durationMinutes;
        durationSeconds = durationSeconds < 10 ? "0" + durationSeconds : durationSeconds;

        if(isNaN(currentMinutes) || isNaN(currentSeconds))
        {
            currentTime.textContent = "00:00";
        }
        else
        {
            currentTime.textContent = currentMinutes + ":" + currentSeconds;
        }

        if(isNaN(durationMinutes) || isNaN(durationSeconds))
        {
            trackLength.textContent = "00:00";
        }
        else
        {
            trackLength.textContent = durationMinutes + ":" + durationSeconds;
        }

        seekBar.style.width = playProgress + "%"; 
            
        if(playProgress == 100)
        {
            seekBar.style.width = 0;
            currentTime.textContent = "00:00";
        }
    }

    function playFromClickedPosition() // Восприоизвести с выбранной позиции
    {
        audio.currentTime = selectedPosition;
        seekBar.style.width = selectedTime;
        hideHover();
    }

    function playlistItemPlayHandler(event)
    {
        if (event.target.classList.contains("play-button-event"))
        {
            let item = event.target.closest("li");
            currentTrackPosition = item.playlistPosition;
            selectTrack();
            playPause();
        }
    }

    function playlistItemAddHandler(event)
    {
        if (event.target.classList.contains("add-button-event"))
        {
            alert("Add: Don't Work!");
        }
    }

    function playlistItemOptionsHandler(event)
    {
        if (event.target.classList.contains("options-button-event"))
        {
            alert("Options: Don't Work!");
        }
    }

    function nextTrack()
    {
        if (currentPlaylist.length > (currentTrackPosition + 1))
        {
            ++currentTrackPosition;
            selectTrack();
            playPause();
        }
    }

    function previousTrack()
    {
        if (0 < currentTrackPosition)
        {
            --currentTrackPosition;
            selectTrack();
            playPause();
        }
    }

    function showHover(event) // Показать всплывающую табличку с временем в указанной точке
    { 
        selectedTime = event.clientX - sArea.getBoundingClientRect().left;
        selectedPosition = audio.duration * (selectedTime / sArea.offsetWidth);
        
        sHover.style.width = selectedTime + "px";
        
        let cM = selectedPosition / 60;
        
        let selectedMinutes = Math.floor(cM);
        let selectedSeconds = Math.floor(selectedPosition - selectedMinutes * 60);
        
        if((selectedMinutes < 0) || (selectedSeconds < 0))
        {
            return;
        }
        if((selectedMinutes < 0) || (selectedSeconds < 0))
        {
            return;
        }

        if(selectedMinutes < 10)
        {
            selectedMinutes = "0" + selectedMinutes;
        }
        if(selectedSeconds < 10)
        {
            selectedSeconds = "0" + selectedSeconds;
        }

        if(isNaN(selectedMinutes) || isNaN(selectedSeconds))
        {
            insTime.textContent = "--:--";
        }
        else
        {
            insTime.textContent = selectedMinutes + ":" + selectedSeconds;
        }

        insTime.style.left = selectedTime + "px";
        insTime.style.marginLeft = "-21px";
        Functions.fadeIn(insTime);
    }

    function hideHover() // Скрыть всплывающую табличку с временем в указанной точке
    {
        sHover.style.width = 0;
        Functions.fadeOut(insTime);
    }

    function selectActiveTrack()
    {
        if (currentPlaylist.length > 0)
        {
            currentPlaylistItem.classList.remove("active"); // Выделение активного элемента в плейлисте
            currentPlaylistItem = playlistItemList[currentTrackPosition];
            currentPlaylistItem.classList.add("active");
        }
    }

    function selectTrack()
    {
        let currentTrack = currentPlaylist[currentTrackPosition];

        selectActiveTrack();


        audio.src = currentTrack.trackPatch;
        trackImage.src = currentTrack.imagePatch;

        let durationMinutes = Math.floor(audio.duration / 60);
        let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);
        durationMinutes = durationMinutes < 10 ? "0" + durationMinutes : durationMinutes;
        durationSeconds = durationSeconds < 10 ? "0" + durationSeconds : durationSeconds;

        currentTime.textContent = "00:00";
        if(isNaN(durationMinutes) || isNaN(durationSeconds))
        {
            trackLength.textContent = "00:00";
        }
        else
        {
            trackLength.textContent = durationMinutes + ":" + durationSeconds;
        }

        trackName.textContent = currentTrack.trackName;
        trackAutor.textContent = currentTrack.autor;

        seekBar.style.width = 0;
    }

    function restartPage()
    {
        if (audio.paused)
        {
            playPauseButtonStyle.className = "fas fa-play";
        }
        else
        {
            playPauseButtonStyle.className = "fas fa-pause"; 
        }
        
        selectActiveTrack();

        if (audio.loop === true)
        {
            playRepeatButton.classList.add("active");
        }

        let currentTrack = currentPlaylist[currentTrackPosition];

        trackName.textContent = currentTrack.trackName;
        trackAutor.textContent = currentTrack.autor;

        updateTime();
    }

    function addItemsInHTMList() // Стартовая прогрузка элементов плейлиста (вынести html в отдельную функцию)
    {
        let position = 0;
        for (let item of currentPlaylist)
        {
            let elem = songElementCreater(position, item.trackPatch, item.imagePatch, item.trackName, item.autor);
            playlist.append(elem);
            position++;
        }
    }

    function run()
    {
        // currentPlaylist = [new Song(false, "Dawn", "Skylike", "http://k003.kiwi6.com/hotlink/hshjwmwndw/2.mp3", baseImage, "79821843rt@gmail.com", "1"),
        //                 new Song(false, "Me & You", "Alex Skrindo", "https://k003.kiwi6.com/hotlink/2rc3rz4rnp/1.mp3", "D:/Image/Windows.png", "79821843rt@gmail.com", "1"),
        //                 new Song(false, "Dawn", "Skylike", "http://k003.kiwi6.com/hotlink/hshjwmwndw/2.mp3", baseImage, "79821843rt@gmail.com", "1"),
        //                 new Song(false, "Me & You", "Alex Skrindo", "https://k003.kiwi6.com/hotlink/2rc3rz4rnp/1.mp3", "D:/Image/Windows.png", "79821843rt@gmail.com", "1"),
        //                 new Song(false, "Dawn", "Skylike", "http://k003.kiwi6.com/hotlink/hshjwmwndw/2.mp3", baseImage, "79821843rt@gmail.com", "1"),
        //                 new Song(false, "Me & You", "Alex Skrindo", "https://k003.kiwi6.com/hotlink/2rc3rz4rnp/1.mp3", "D:/Image/Windows.png", "79821843rt@gmail.com", "1"),
        //                 new Song(false, "Dawn", "Skylike", "http://k003.kiwi6.com/hotlink/hshjwmwndw/2.mp3", baseImage, "79821843rt@gmail.com", "1"),
        //                 new Song(false, "Me & You", "Alex Skrindo", "https://k003.kiwi6.com/hotlink/2rc3rz4rnp/1.mp3", "D:/Image/Windows.png", "79821843rt@gmail.com", "1")]//!!! Временная строка
        // // !!! Нужно сделать извлечение из БД

        addItemsInHTMList(); // Выводит текущий плейлист в документе

        playlistItemList = playlist.querySelectorAll("li");
        currentPlaylistItem = playlistItemList[currentTrackPosition];

        if (audio.currentTime == 0)
        {
            selectTrack();
        }
        else    // Рестарт после перехода с другой страницы
        {
            restartPage();
        }

        playPauseButton.addEventListener("click", playPause);
        playPreviousButton.addEventListener("click", previousTrack);
        playNextButton.addEventListener("click", nextTrack);
        playRepeatButton.addEventListener("click", function ()
        {
            if (audio.loop === false)
            {
                audio.loop = true;
                playRepeatButton.classList.add("active");
            }
            else
            {
                audio.loop = false;
                playRepeatButton.classList.remove("active");
            }
        });
        playMixButton.addEventListener("click", function(){ alert("MixButton: Don't work") });

        playlist.addEventListener("click", playlistItemPlayHandler);
        playlist.addEventListener("click", playlistItemAddHandler);
        playlist.addEventListener("click", playlistItemOptionsHandler);

        playlist.addEventListener("error", function (event)
        {
            event.target.src = baseImage;
        });

        trackImage.addEventListener("error", function ()
        {
            trackImage.src = baseImage;
        });

        audio.addEventListener("ended", nextTrack);
        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("error", function (event) 
        { 
            alert(`An error has occurred. Audio cannot be played.
            Check your connection and try starting another recording.`); 
        });

        sArea.addEventListener("mousemove", showHover);
        sArea.addEventListener("mouseout", hideHover);
        sArea.addEventListener("click", playFromClickedPosition);
    }
}
export default AudioControler;