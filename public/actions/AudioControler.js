"use strict"

//import Song from "../views/components/Song.js";
import Utils from "./Utils.js";
import Functions from "./AdditionalFunctions.js";
import songElementCreater from "../views/components/SongElement.js";
import modalPageControler from "./ModalPageControler.js";

async function AudioControler()
{
    const baseImage = "../source/music_base.png";

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

    // Первое открытие страницы. Создание глобальных переменных которые отвечают за фоновое воспроизведение
    // и востановление страницы после возвращения с другой страницы сайта.
    if (window.audio === undefined)
    {
        window.playlistItemList = []; // Набор всех HTML элементов отображаемых в плейлисте
        window.currentPlaylistItem = null; // Выбранный на данный момент элемент
        window.selectedTime = 0;
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
                    run();
                });
            }
            else
            {
                window.currentPlaylist = window.userPlaylist;
                run();
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
            if (!window.play)
            {
                playPauseButtonStyle.className = "fas fa-pause";  // Меняем значение атрибута class в элементе i на fas fa-pause (значок паузы)
                audio.play();
                window.play = true;
            }
            else
            {
                playPauseButtonStyle.className = "fas fa-play"; // Меняем значение атрибута class в элементе i на fas fa-pause (значок запуска)
                audio.pause();
                window.play = false;
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

    // Воспроизведение выбранной записи
    function playlistItemPlayHandler(event)
    {
        if (event.target.classList.contains("play-button-event"))
        {
            let selectedSongItem = event.target.closest("li");
            if (selectedSongItem === null || selectedSongItem === undefined)
            {
                console.log("play-button-event: 'li' item not found.");
                return;
            }

            window.currentTrackPosition = selectedSongItem.playlistPosition;

            window.play = true;
            selectTrack(undefined, () =>
            {
                setTimeout(() =>
                {
                    playPauseButtonStyle.className == "fas fa-pause"
                    window.audio.play();
                }, 350);
            });
        }
    }

    // Добавление записи из списка
    function playlistItemAddHandler(event)
    {
        if (event.target.classList.contains("add-button-event"))
        {
            let selectedSongItem = event.target.closest("li");
            if (selectedSongItem === null || selectedSongItem === undefined)
            {
                console.log("add-button-event: 'li' item not found.");
                return;
            }

            Utils.bdAddNewDocInUserPlaylist(currentPlaylist[selectedSongItem.playlistPosition].dbId, () =>
            {
                if (window.userPlaylist !== undefined && window.userPlaylist !== null && window.currentTrackPosition !== undefined)
                {
                    window.currentTrackPosition++;
                    window.userPlaylist.unshift(result);
                }
                else
                {
                    window.currentTrackPosition = 0;
                    window.userPlaylist[result];
                }
            });
        }
    }

    // Настройки записи (если есть права на её изменение)
    function playlistItemOptionsHandler(event)
    {
        if (event.target.classList.contains("options-button-event"))
        {
            let selectedSongItem = event.target.closest("li");
            if (selectedSongItem === null || selectedSongItem === undefined)
            {
                console.log("option-button-event: 'li' item not found.");
                return;
            }

            let fun = null;
            if (selectedSongItem.classList.contains("active"))
            {
                fun = () =>
                { 
                    restartPage(); 
                    addItemsInHTMList();
                };
            }
            else
            {
                fun = addItemsInHTMList;
            }

            modalPageControler("update", selectedSongItem.querySelector("img").src, currentPlaylist[selectedSongItem.playlistPosition], () => {fun()});
        }
    }

    // Удаление записи из плей листа
    function playlistItemDelete(event)
    {
        if (event.target.classList.contains("delete-button-event"))
        {
            let result = confirm("You will remove the entry from your playlist. If this record is created by you, you can still change it if it is in the public domain. Otherwise, it will be irretrievably lost.");
            if (result == false)
            {
                return;
            }

            let selectedSongItem = event.target.closest("li");
            if (selectedSongItem === null || selectedSongItem === undefined)
            {
                console.log("delete-button-event: 'li' item not found.");
                return;
            }

            let song = currentPlaylist[selectedSongItem.playlistPosition];

            let music = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("music");

            music.where("patch", "==", "/songs/" + song.dbId).get().then(querySnapshot => 
            {
                querySnapshot.forEach(doc => 
                    {
                        music.doc(doc.id).delete().then(() => {console.log("Song delete.")})
                        .catch(() => {console.log("Erroe: song not delete.")})
                    });
            }).catch(event => 
            {
                alert("Failed to delete song: ", error);
            });

            if (currentTrackPosition > selectedSongItem.playlistPosition)
            {
                currentTrackPosition--;
            }
            currentPlaylist.splice(selectedSongItem.playlistPosition, 1);
            addItemsInHTMList();
            selectActiveTrack();
            //selectTrack();
        }
    }

    // Переход к следующей записи
    function nextTrack()
    {
        if (currentPlaylist.length > window.currentTrackPosition)
        {
            ++window.currentTrackPosition;
        }
        else
        {
            playPauseButtonStyle.className = "fas fa-play";
            window.audio.pause();
            window.play = false;
        }

        selectTrack(undefined, () =>
        {
            if (window.play)
            {
                setTimeout(() =>
                {
                    window.audio.play();
                    window.play = true;
                }, 350);
            }
            else
            {
                setTimeout(() =>
                {
                    window.audio.pause();
                    window.play = false;
                }, 350);
            }
        });
    }

    // Переход к предыдущей записи
    function previousTrack()
    {
        if (0 < window.currentTrackPosition)
        {
            --window.currentTrackPosition;
        }
        else
        {
            playPauseButtonStyle.className = "fas fa-play";
            window.audio.pause();
            window.play = false;
        }

        selectTrack(undefined, () =>
        {
            if (window.play)
            {
                setTimeout(() =>
                {
                    window.audio.play();
                    window.play = true;
                }, 350);
            }
            else
            {
                setTimeout(() =>
                {
                    window.audio.pause();
                    window.play = false;
                }, 350);
            }
        });
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
    function selectTrack(imageThen, audioThen)
    {
        if (window.play)
        {
            playPauseButtonStyle.className = "fas fa-pause";
        }
        else
        {
            playPauseButtonStyle.className = "fas fa-play";
        }

        if (currentPlaylist === undefined || currentPlaylist.length <= 0)
        {
            return;
        }

        let currentTrack = currentPlaylist[window.currentTrackPosition];

        selectActiveTrack();

        trackName.textContent = currentTrack.trackName;
        trackAutor.textContent = currentTrack.autor;

        Utils.setSourceFromStorage(currentTrack.trackPatch, audio, imageThen);
        Utils.setSourceFromStorage(currentTrack.imagePatch, trackImage, () =>
        {
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

            if (typeof audioThen == "function")
            {
                audioThen();
            }
        });

        if (audio.loop)
        {
            playRepeatButton.classList.remove("active");
            playRepeatButton.classList.add("active");
        }

        if (window.mixStatus)
        {
            playMixButton.classList.remove("active");
            playMixButton.classList.add("active");
        }

        seekBar.style.width = 0;
    }

    // Востановление страницы после возврата на неё
    function restartPage()
    {
        if (window.play)
        {
            playPauseButtonStyle.className = "fas fa-pause";
        }
        else
        {
            playPauseButtonStyle.className = "fas fa-play";
        }
        
        selectActiveTrack();

        if (audio.loop)
        {
            playRepeatButton.classList.add("active");
        }

        if (window.mixStatus)
        {
            playMixButton.classList.add("active");
        }

        if (currentPlaylist === undefined || currentPlaylist.length <= 0)
        {
            return;
        }

        let currentTrack = currentPlaylist[window.currentTrackPosition];

        trackName.textContent = currentTrack.trackName;
        trackAutor.textContent = currentTrack.autor;

        updateTime();

        Utils.setSourceFromStorage(currentTrack.imagePatch, trackImage);
    }

    // Стартовая прорисовка элементов плейлиста
    // (К сожалению пока грузится сразу весь плейлист. Подумать об реализации AJAX через firebase)
    function addItemsInHTMList()
    {
        playlist.innerHTML = "";
        let position = 0;
        let buttonType = "add";
        if (window.isCurrentPlaylistUserPlaylist)
        {
            buttonType = "delete";
        }
        for (let item of currentPlaylist)
        {
            let elem = songElementCreater(position, item.trackPatch, baseImage, item.trackName, item.autor, buttonType);
            
            if (item.imagePatch !== undefined && item.imagePatch !== null && item.imagePatch !== "")
            {
                Utils.setSourceFromStorage(item.imagePatch, elem.querySelector("img"));
            }
            playlist.append(elem);
            position++;
        }
    }

    function run()
    {
        if (window.currentPlaylist === undefined)
        {
            window.currentPlaylist = window.userPlaylist;
        }

        addItemsInHTMList();

        playlistItemList = playlist.querySelectorAll("li");
        currentPlaylistItem = playlistItemList[window.currentTrackPosition];

        if (window.currentPlaylist.length <= 0)
        {
            let elem = Function.stubElement("The current playlist is empty");
            playlist.append(elem);
        }

        if (audio.currentTime == 0 || window.restart) // Первый вход на страницу
        {
            window.restart = false;
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
            if (currentPlaylist !== undefined && currentPlaylist !== null && currentPlaylist.length !== 0)
            {
                window.play = false;
                window.audio.pause();
                playPauseButtonStyle.className = "fas fa-play";

                if (window.mixStatus === undefined || window.mixStatus === false)
                {
                    window.mixStatus = true;
                    window.correctSequence = currentPlaylist.slice();
                    shuffle(currentPlaylist);
                    playMixButton.classList.add("active");
                }
                else
                {
                    window.mixStatus = false;
                    currentPlaylist = window.correctSequence;
                    delete window.correctSequence;
                    playMixButton.classList.remove("active");
                }
                
                addItemsInHTMList();
                selectActiveTrack();
                selectTrack();

                function shuffle(array) 
                {
                    for (let i = array.length - 1; i > 0; i--)
                    {
                    let j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                    }
                }
            }
        });

        playlist.addEventListener("click", playlistItemPlayHandler);
        playlist.addEventListener("click", playlistItemAddHandler);
        playlist.addEventListener("click", playlistItemOptionsHandler);
        playlist.addEventListener("click", playlistItemDelete);

        playlist.addEventListener("error", event =>
        {
            event.target.src = baseImage;
        });

        trackImage.addEventListener("error", () =>
        {
            trackImage.src = baseImage;
        });

        audio.onended = nextTrack;
        audio.ontimeupdate = updateTime;
        audio.onerror = event =>
        { 
            alert(`An error has occurred. Audio cannot be played.
            Check your connection and try starting another recording.`); 
        };

        sArea.addEventListener("mousemove", showHover);
        sArea.addEventListener("mouseout", hideHover);
        sArea.addEventListener("click", playFromClickedPosition);
    }
}
export default AudioControler;