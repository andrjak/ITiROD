"use strict"

import Song from "../views/components/Song.js";
import Utils from "./Utils.js";
import AdditionalFunction from "./AdditionalFunctions.js";
import songElementCreater from "../views/components/SongElement.js";
import modalPageControler from "./ModalPageControler.js";

function MyMusicControler()
{
    const baseImage = "../source/music_base.png";

    let myMusicPlaylistElement   = document.getElementById("my-playlist");
    let recommendPlaylistElement = document.getElementById("recommend-playlist");
    let addButton = document.getElementById("create-new-song-button");
    let allMusicCard = document.getElementById("all-music");

    let searchInput = document.getElementById("search-input");
    let searchButton = document.getElementById("search-button");
    
    let myMusicPlaylist = [];
    let recommendPlaylist = [];

    window.snapshotUserPlaylist = undefined;
    window.snapshotAllMusicPlaylist = undefined;

    function myMusicInit()
    {
        myMusicPlaylistElement.innerHTML = "";
        if (myMusicPlaylist.length <= 0)
        {
            let elem = AdditionalFunction.stubElement("Custom playlist here you can add songs from the general playlist or upload your own recording");
            myMusicPlaylistElement.append(elem);
            return;
        }

        let position = 0;
        for (let item of myMusicPlaylist)
        {
            let elem = songElementCreater(
                position,
                item.trackPatch,
                baseImage,
                item.trackName,
                item.autor,
                "delete");
            myMusicPlaylistElement.append(elem);

            if (item.imagePatch !== undefined && item.imagePatch !== null && item.imagePatch !== "")
            {
                Utils.setSourceFromStorage(item.imagePatch, elem.querySelector("img"));
            }
            position++;
        }
    }

    function allMusicInit()
    {
        recommendPlaylist.innerHTML = "";

        let position = 0;
        for (let item of recommendPlaylist)
        {
            let elem = songElementCreater(
                position,
                item.trackPatch,
                baseImage,
                item.trackName,
                item.autor);
            recommendPlaylistElement.append(elem);

            if (item.imagePatch !== undefined && item.imagePatch !== null && item.imagePatch !== "")
            {
                Utils.setSourceFromStorage(item.imagePatch, elem.querySelector("img"));
            }
            position++;
        }
    }

    function addButtonHandler(event)
    {
        if (event.target.classList.contains("add-button-event"))
        {
            let selectedSongItem = event.target.closest("li");
            if (selectedSongItem === null || selectedSongItem === undefined)
            {
                console.log("add-button-event: 'li' item not found.");
                return;
            }

            if (event.currentTarget.classList.contains("all-play-list"))
            {
                let result = recommendPlaylist[selectedSongItem.playlistPosition];
                Utils.bdAddNewDocInUserPlaylist(result.dbId);

                if (window.userPlaylist !== undefined && window.userPlaylist !== null)
                {
                    if (window.isCurrentPlaylistUserPlaylist && window.currentTrackPosition !== undefined)
                    {
                        window.currentTrackPosition++;
                    }
                    window.userPlaylist.unshift(result);
                    myMusicPlaylist = window.userPlaylist;
                }
                else
                {
                    if (window.isCurrentPlaylistUserPlaylist && window.currentTrackPosition !== undefined)
                    {
                        window.currentTrackPosition = 0;
                    }
                    window.userPlaylist = [result];
                    myMusicPlaylist = window.userPlaylist;
                }

                myMusicInit();
            }
        }
    }

    // Возможность изменять информацию о записи если пользователь является её владельцем
    function optionButtonHandler(event)
    {
        if (event.target.classList.contains("options-button-event"))
        {
            let selectedSongItem = event.target.closest("li");
            if (selectedSongItem === null || selectedSongItem === undefined)
            {
                console.log("option-button-event: 'li' item not found.");
                return;
            }

            if (event.currentTarget.classList.contains("user-play-list"))
            {
                modalPageControler("update", selectedSongItem.querySelector("img").src, myMusicPlaylist[selectedSongItem.playlistPosition], myMusicInit);
            }
            else
            {
                modalPageControler("update", selectedSongItem.querySelector("img").src, recommendPlaylist[selectedSongItem.playlistPosition], allMusicInit);
            }
        }
    }

    // Удаление из пользовательского плейлиста (из БД не удаляется, т.к. эту запись могут использовать другие пользователи)
    function deleteButtonHandler(event)
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

            firebase.auth().onAuthStateChanged(function (user)
            {
                if (user)
                {
                    let song = myMusicPlaylist[selectedSongItem.playlistPosition];

                    let music = firebase.firestore().collection("users").doc(user.uid).collection("music");
        
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
        
                    myMusicPlaylist.splice(selectedSongItem.playlistPosition, 1);
                    myMusicInit();
        
                    if (window.audio !== undefined)
                    {
                        audio.pause();
                    }
                }
            });
        }
    }

    // Переход на страницу CurrentPlaylist с установкой выбранной записи и всех последующих из плейлиста
    function playButtonHandler(event)
    {
        if (event.target.classList.contains("play-button-event"))
        {
            let selectedSongItem = event.target.closest("li");
            if (selectedSongItem === null || selectedSongItem === undefined)
            {
                console.log("option-button-event: 'li' item not found.");
                return;
            }

            window.restart = true;
            window.mixStatus = undefined;
            if (event.currentTarget.classList.contains("user-play-list"))
            {
                if (window.audio) window.audio.pause();
                window.isCurrentPlaylistUserPlaylist = true;
                window.currentPlaylist = myMusicPlaylist;
                window.currentTrackPosition = selectedSongItem.playlistPosition;
                document.location.href = "/#/CurrentPlaylist";
            }
            else
            {
                if (window.audio) window.audio.pause();
                window.isCurrentPlaylistUserPlaylist = false;
                window.currentPlaylist = recommendPlaylist;
                window.currentTrackPosition = selectedSongItem.playlistPosition;
                document.location.href = "/#/CurrentPlaylist";
            }
        }
    }

    function search(event)
    {
        if (!snapshotUserPlaylist || !snapshotAllMusicPlaylist)
        {
            snapshotUserPlaylist = window.userPlaylist.slice();
            snapshotAllMusicPlaylist = window.allPlaylist.slice();
        }
        else
        {
            window.userPlaylist = snapshotUserPlaylist;
            window.allPlaylist = snapshotAllMusicPlaylist;
        }

        let value = searchInput.value.trim().toUpperCase();

        if (value == "")
        {
            return;
        }

        if (window.userPlaylist)
        {
            myMusicPlaylistElement.innerHTML = "";
            let selectedUserMusic = [];
            let position = 0;
            for (let item of window.userPlaylist)
            {
                if (item.autor.toUpperCase() == value || item.trackName.toUpperCase() == value)
                {
                    selectedUserMusic.push(item);
                    let elem = songElementCreater(
                        position,
                        item.trackPatch,
                        baseImage,
                        item.trackName,
                        item.autor,
                        "delete");
                    myMusicPlaylistElement.append(elem);
        
                    if (item.imagePatch !== undefined && item.imagePatch !== null && item.imagePatch !== "")
                    {
                        Utils.setSourceFromStorage(item.imagePatch, elem.querySelector("img"));
                    }
                    position++;
                }
            }
        }

        let selectedAllMusic = [];
        if (window.allPlaylist)
        {
            Utils.bdGlobalSearch(selectedAllMusic, value, () =>
            {
                recommendPlaylistElement.innerHTML("");
                position = 0;
                for (let item of selectedAllMusic)
                {
                    let elem = songElementCreater(
                        position,
                        item.trackPatch,
                        baseImage,
                        item.trackName,
                        item.autor,
                        "delete");
                    recommendPlaylistElement.append(elem);
            
                    if (item.imagePatch !== undefined && item.imagePatch !== null && item.imagePatch !== "")
                    {
                        Utils.setSourceFromStorage(item.imagePatch, elem.querySelector("img"));
                    }
                    position++;
                 }
            });
        }
    }

    function run() // Стартовая прогрузка элементов плейлиста (вынести html в отдельную функцию)
    {
        if (window.userPlaylist !== undefined) // Если пользовательский плейлист уже создан то используем его
        {
            myMusicPlaylist = window.userPlaylist;
            myMusicInit();
        }
        else // Если пользовательский плейлист ещё не создан получаем его из бд
        {
            Utils.bdUserPlaylistLoad(undefined, () => 
            {
                myMusicPlaylist = window.userPlaylist;
                myMusicInit();
            });
        }
    
        if (window.allPlaylist !== undefined)
        {
            recommendPlaylist = window.allPlaylist;
            allMusicInit();
        }
        else
        {
            Utils.bdAllMusicPlaylistLoad(undefined, () =>
            {
                recommendPlaylist = window.allPlaylist;
                allMusicInit();
            })
        }

        addButton.addEventListener("click", event =>
        {
            modalPageControler("create", undefined, undefined, myMusicInit);
        });

        myMusicPlaylistElement.addEventListener("click", playButtonHandler);
        myMusicPlaylistElement.addEventListener("click", addButtonHandler);
        myMusicPlaylistElement.addEventListener("click", optionButtonHandler);
        myMusicPlaylistElement.addEventListener("click", deleteButtonHandler);

        recommendPlaylistElement.addEventListener("click", playButtonHandler);
        recommendPlaylistElement.addEventListener("click", addButtonHandler);
        recommendPlaylistElement.addEventListener("click", optionButtonHandler);
        recommendPlaylistElement.addEventListener("click", deleteButtonHandler);
        allMusicCard.addEventListener('scroll', () =>
        {
            if (window.isUpdated === undefined || window.isUpdated === false)
            {
                window.isUpdated = true;

                let windowRelativeBottom = allMusicCard.getBoundingClientRect().bottom;
                if (windowRelativeBottom > allMusicCard.height + 100) return;

                let len = recommendPlaylistElement.querySelectorAll("li").length;

                Utils.bdAllMusicPlaylistLoad(undefined, () => 
                {
                    while (len < window.allPlaylist.length)
                    {
                        let item = window.allPlaylist[len];
                        let elem = songElementCreater(
                            len,
                            item.trackPatch,
                            baseImage,
                            item.trackName,
                            item.autor);
                        recommendPlaylistElement.append(elem);
                
                        if (item.imagePatch !== undefined && item.imagePatch !== null && item.imagePatch !== "")
                        {
                            Utils.setSourceFromStorage(item.imagePatch, elem.querySelector("img"));
                        }

                        len++;
                    }

                    window.isUpdated = false;
                });
            }
        });

        searchButton.addEventListener("click", search);

        document.addEventListener('keydown', event =>
        {
            if (event.keyCode === 13 && searchInput.value.trim() !== "") 
            {
                search(event);
            }
        });
    
        searchInput.addEventListener("change", () =>
        {
            if (searchInput.value == "")
            {
                window.userPlaylist = snapshotUserPlaylist;
                window.allPlaylist = snapshotAllMusicPlaylist;

                myMusicInit();
                allMusicInit();
            }
        });
    }

    run();
}

export default MyMusicControler;
