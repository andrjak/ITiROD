"use strict"

import Song from "../views/components/Song.js";
import Playlists from "../views/pages/PlaylistsPage.js";

let Utils =
{
    parseRequestURL : () => {

        let url = location.hash.slice(1).toLowerCase() || "/";
        let r = url.split("/");
        let request = {
            resource    : null,
            id          : null,
            verb        : null
        };
        request.resource    = r[1];
        request.id          = r[2];
        request.verb        = r[3];

        return request;
    },

    timeLabelCreater : () =>
    {
        let date = new Date();
        return String(date.getYear()) + String(date.getMonth())
        + String(date.getDate()) + String(date.getHours())
        + String(date.getMinutes()) + String(date.getSeconds())
        + String(date.getMilliseconds())
    },

    // Загрузка данных из firestorage
    // * patch = Полный путь к файлу firestore в формате (gs:)
    // * sourceElement объект с свойство src для которого устанавливается путь к загружаемому контенту
    setSourceFromStorage: (patch, sourceElement, then) =>
    {
        if (String(patch).indexOf("gs:") == 0)
        {
            firebase.storage().refFromURL(patch).getDownloadURL().then(function(url) 
            {
                sourceElement.src = url;

                if (typeof then == "function")
                {
                    then();
                }
            }).catch(function(error) 
            {
                alert("Download error: " + error.message);
            });
        }
        else
        {
            sourceElement.src = patch;
        }
    },

    bdUserPlaylistLoad : (oneRecordLoaded, allRecordLoaded) =>
    {
        window.userPlaylist = [];

        let music = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("music");

        music.get().then(querySnapshot =>
        {
            let counter = 0;
            querySnapshot.forEach(songPatchDoc => 
            {
                let currentDoc = firebase.firestore().doc(songPatchDoc.data().patch);
                currentDoc.get().then(doc => 
                {
                    if (doc.exists)
                    {
                        let item = doc.data();
                        userPlaylist.push(new Song(item.status, item.songName, item.songAutor, item.songPatch, item.imagePatch, doc.id));
                        if (oneRecordLoaded !== undefined && typeof oneRecordLoaded === "function")
                        {
                            oneRecordLoaded();
                        }
                        counter++;
                        if (counter === querySnapshot.size)
                        {
                            if (allRecordLoaded !== undefined && typeof allRecordLoaded === "function")
                            {
                                allRecordLoaded();
                            }
                        }
                    }
                    else
                    {
                        let result = confirm("Perhaps one of the entries has been removed from public access, you want to remove it from the playlist. If it remains, then this message will appear every time the playlist is loaded until the entry is deleted or access is restored.");
                    
                        if (result == true)
                        {
                            songPatchDoc.delete().then(
                                () =>
                                {
                                    console.log("Song delete.");
                                }).catch(event =>
                                {
                                    alert("Failed to delete song: ", error);
                                });
                        }
                    }
                }).catch((error) =>
                {
                    console.log("Document error: " + error.message);
                });
            });
        }).catch((error) => 
        {
            console.log("Collection error: " + error.message);
        });
    },

    bdAllMusicPlaylistLoad : (oneRecordLoaded, allRecordLoaded) =>
    {
        let playlist = []
        let music = firebase.firestore().collection("songs");

        music.get().then(querySnapshot =>
        {
            if (querySnapshot.size <= 20)
            {
                querySnapshot.forEach(doc => 
                {
                    let item = doc.data();

                    if (item.status)
                    {
                        playlist.push(new Song(item.status, item.songName, item.songAutor, item.songPatch, item.imagePatch, doc.id))
                    }
                });
            }
        });
    }
};

export default Utils;