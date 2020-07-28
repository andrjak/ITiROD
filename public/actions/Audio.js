"use strict"

import Song from "../views/components/Song.js";
import Functions from "./AdditionalFunctions.js";

function init()
{
//Константы 
const baseImage = "../source/music_base.png";

// Коллекция с музыкой получаемая из бд
var currentPlaylist;

// Информация о песне
var trackImage  = document.getElementById("player-img");
var playerTrack = document.getElementById("player-track");
var trackName   = document.getElementById("track-name");
var trackTime   = document.getElementById("track-time");
var currentTime = document.getElementById("current-time");
var trackLength = document.getElementById("track-length");

// Управление воспроизведением
var playPreviousButton = document.getElementById("play-previous");
var playPauseButton    = document.getElementById("play-pause-button");
var playNextButton     = document.getElementById("play-next");
var playRepeatButton   = document.getElementById("play-repeat");
var playMixButton      = document.getElementById("play-mix");

// Линия прокрутки и всплывающая табличка
var sArea   = document.getElementById("s-area");
var insTime = document.getElementById("ins-time");
var sHover  = document.getElementById("s-hover");
var seekBar = document.getElementById("seek-bar");

// Элементы отвечающие за изображение на кнопках (изменение после нажатия)
var playPauseButtonStyle = playPauseButton.querySelector("i"); // Должно работать

// Текущий плей лист
var playlist = document.getElementById("playlist");

// Управляющие элементы
var audio = new Audio();
var currentTrackPosition = 0; // Номер текущей записи в плей листе
var selectedPosition = 0; // Позиция с которой воспроизоводится запись
var selectedTime = 0;

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

function playlistItemHandler(event)
{
    let item = event.target.closest("li");
    currentTrackPosition = item.playlistPosition;
    selectTrack();
    playPause();
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

function selectTrack()
{
    let currentTrack = currentPlaylist[currentTrackPosition];
    audio.src = currentTrack.trackPatch;
    trackImage.src = currentTrack.imagePatch;
    currentTime.textContent = "00:00";
    trackLength.textContent = "00:00";
    seekBar.style.width = 0;
}

function addItemsInHTMList() // Стартовая прогрузка элементов плейлиста (вынести html в отдельную функцию)
{
    let position = 0;
    for (let item of currentPlaylist)
    {
        let elem = document.createElement("li");
        elem.playlistPosition = position;
        elem.trackPatch = item.trackPatch;
        elem.classList.add("playlist-item");
        elem.innerHTML = 
        `<img class="playlist-item-img" src="` + item.imagePatch + `" alt="song cover" >
        <div class="song-track-info">
            <div class="track-name">` + item.trackName + `</div>
            <em class="autor-name">` + item.autor + `</em>
        </div>
        <div class="song-ctrl-btn-group">
            <button class="song-ctrl-btn button" name="play" alt="play">
                <i class="fas fa-play"></i>
            </button>
            <button class="song-ctrl-btn button" name="add" alt="add">
                <i class="fas fa-plus"></i>
            </button>
            <button class="song-ctrl-btn button" name="options" alt="options">
                <i class="fas fa-ellipsis-v"></i>
            </button>
        </div>`

        playlist.append(elem);
        position++;
    }
}

function start()
{
    currentPlaylist = [new Song(false, "Dawn", "Skylike", "http://k003.kiwi6.com/hotlink/hshjwmwndw/2.mp3", baseImage, "79821843rt@gmail.com", "1"),
                       new Song(false, "Me & You", "Alex Skrindo", "https://k003.kiwi6.com/hotlink/2rc3rz4rnp/1.mp3", "D:/Image/Windows.png", "79821843rt@gmail.com", "1")]//!!! Временная строка
    // !!! Нужно сделать извлечение из БД

    console.dir(currentPlaylist);

    audio.loop = false; // По умолчанию выключенно

    addItemsInHTMList(); // Выводит текущий плейлист в документе

    selectTrack();

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
    playMixButton.addEventListener("click", /*!!!Не назначен*/ function(){});

    playlist.addEventListener("click", playlistItemHandler);
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

    sArea.addEventListener("mousemove", showHover);
    sArea.addEventListener("mouseout", hideHover);
    sArea.addEventListener("click", playFromClickedPosition);
}

start();
}
export default init;