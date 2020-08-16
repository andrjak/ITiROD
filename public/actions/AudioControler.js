"use strict"

import Song from "../views/components/Song.js";
import Utils from "./Utils.js";
import Functions from "./AdditionalFunctions.js";
import songElementCreater from "../views/components/SongElement.js";
import modalPageControler from "./ModalPageControler.js";

async function AudioControler()
{
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

    let playlistItemList = []; // Набор всех HTML элементов отображаемых в плейлисте
    let currentPlaylistItem = null; // Выбранный на данный момент элемент
    let selectedTime = 0;

    // Первое открытие страницы. Создание глобальных переменных которые отвечают за фоновое воспроизведение
    // и востановление страницы после возвращения с другой страницы сайта.
    if (window.audio === undefined)
    {
        window.audio = new Audio(); // Объект отвечающий за воспроизведение музыки (должен быть доступен после возвращения на страницу)
        window.currentTrackPosition = 0; // Номер текущей записи в плей листе
        window.selectedPosition = 0; // Позиция с которой воспроизоводится запись

        if (window.currentPlaylist === undefined || window.currentPlaylist === null) // Получение плейлиста(пользовательского) из базы данных елси он не был получен рание
        {
            window.isCurrentPlaylistUserPlaylist = true;
            window.currentPlaylist = []; // Глобальная переменная отвечающая за текущий плей лист

            if (window.userPlaylist === undefined || window.userPlaylist === null)
            {
                Utils.bdUserPlaylistLoad(undefined, () =>
                {
                    window.currentPlaylist = window.userPlaylist;
                    run()
                });
            }
            else
            {
                window.currentPlaylist = window.userPlaylist;
            }
        }
        else
        {
            run();
        }
    }
    else
    {
        run();
    }

    // Обработчик события для кнопки play-pause меняет стиль кнопки и начинает/приостанавливает воспроизведение аудио
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

    // Обновление времени на счётчике и также передвежение ползунка
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

    // Восприоизвести с выбранной позиции
    function playFromClickedPosition()
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
            let selectedSongItem = event.target.closest("li");
            if (selectedSongItem === null)
            {
                console.log("option-button-event: 'li' item not found.");
                return;
            }
            modalPageControler("update", selectedSongItem.querySelector("img").src, currentPlaylist[selectedSongItem.playlistPosition]);
        }
    }

    // Переход к следующей записи
    function nextTrack()
    {
        if (currentPlaylist.length > (currentTrackPosition + 1))
        {
            ++currentTrackPosition;
            selectTrack();
            playPause();
        }
    }

    // Переход к предыдущей записи
    function previousTrack()
    {
        if (0 < currentTrackPosition)
        {
            --currentTrackPosition;
            selectTrack();
            playPause();
        }
    }

    // Показать всплывающую табличку с временем в указанной точке
    function showHover(event)
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

    // Скрыть всплывающую табличку с временем в указанной точке
    function hideHover()
    {
        sHover.style.width = 0;
        Functions.fadeOut(insTime);
    }

    // Выделение текущего активного элемента в плейлисте
    function selectActiveTrack()
    {
        if (currentPlaylist.length > 0 && currentPlaylistItem !== undefined)
        {
            currentPlaylistItem.classList.remove("active");
            currentPlaylistItem = playlistItemList[currentTrackPosition];
            currentPlaylistItem.classList.add("active");
        }
    }

    // Выбор новой записи из плейлиста
    function selectTrack()
    {
        selectActiveTrack();

        let currentTrack = currentPlaylist[currentTrackPosition];

        let durationMinutes = Math.floor(audio.duration / 60);
        let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);
        durationMinutes = durationMinutes < 10 ? "0" + durationMinutes : durationMinutes;
        durationSeconds = durationSeconds < 10 ? "0" + durationSeconds : durationSeconds;

        trackName.textContent = currentTrack.trackName;
        trackAutor.textContent = currentTrack.autor;

        Utils.setSourceFromStorage(currentTrack.trackPatch, audio);
        Utils.setSourceFromStorage(currentTrack.imagePatch, trackImage);

        currentTime.textContent = "00:00";
        if(isNaN(durationMinutes) || isNaN(durationSeconds))
        {
            trackLength.textContent = "00:00";
        }
        else
        {
            trackLength.textContent = durationMinutes + ":" + durationSeconds;
        }

        seekBar.style.width = 0;
    }

    // Востановление страницы после возврата на неё
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

        Utils.setSourceFromStorage(currentTrack.imagePatch, trackImage);

        let counter = 0;
        for (let item of playlist.querySelectorAll("img"))
        {
            if (currentPlaylist[counter].imagePatch !== undefined)
            {
                Utils.setSourceFromStorage(currentPlaylist[counter], item);
            }
            counter++;
        }
    }

    // Стартовая прорисовка элементов плейлиста
    // (К сожалению пока грузится сразу весь плейлист. Подумать об реализации AJAX через firebase)
    function addItemsInHTMList()
    {
        if (currentPlaylist === undefined || currentPlaylist === null)
        {
            return;
        }

        playlist.innerHTML = "";
        let position = 0;
        for (let item of currentPlaylist)
        {

            let elem = songElementCreater(position, item.trackPatch, baseImage, item.trackName, item.autor);
            
            if (item.imagePatch !== undefined)
            {
                Utils.setSourceFromStorage(item.imagePatch, elem.querySelector("img"));
            }
            playlist.append(elem);
            position++;
        }
    }

    function run()
    {
        addItemsInHTMList();

        playlistItemList = playlist.querySelectorAll("li");
        currentPlaylistItem = playlistItemList[currentTrackPosition];

        if (audio.currentTime == 0) // Первый вход на страницу
        {
            selectTrack();
        }
        else // Рестарт после перехода с другой страницы
        {
            restartPage();
        }

        // Установка обработчиков событий
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
        playMixButton.addEventListener("click", function()
        { 
            alert("MixButton: Don't work") 
        });

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