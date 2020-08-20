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

            if (typeof then == "function")
            {
                then();
            }
        }
    },

    bdUserPlaylistLoad : (oneRecordLoaded, allRecordLoaded) =>
    {
        window.userPlaylist = [];

        firebase.auth().onAuthStateChanged(function (user)
        {
            if (user)
            {
                let music = firebase.firestore().collection("users").doc(user.uid).collection("music");

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
                                window.userPlaylist.reverse();
                                if (typeof oneRecordLoaded === "function")
                                {
                                    oneRecordLoaded();
                                }
                                counter++;
                                if (counter === querySnapshot.size)
                                {
                                    if (typeof allRecordLoaded === "function")
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
                                    music.doc(songPatchDoc.id).delete().then(
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
            }
        });

    },

    bdAllMusicPlaylistLoad : (oneRecordLoaded, allRecordLoaded) =>
    {
        if (window.allPlaylist === undefined)
        {
            window.allPlaylist = [];
        }

        let patch = firebase.firestore().collection("songs").where("status", "==", true).orderBy("songPatch");

        if (window.lastVisible === undefined)
        {
            patch.limit(5).get().then(documentSnapshots =>
            {
                window.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
        
                let counter = 0;
                documentSnapshots.forEach(doc => 
                    {
                        if (doc.exists)
                        {
                            let item = doc.data();
                            window.allPlaylist.push(new Song(item.status, item.songName, item.songAutor, item.songPatch, item.imagePatch, doc.id));
                            if (typeof oneRecordLoaded === "function")
                            {
                                oneRecordLoaded();
                            }

                            counter++;
                            if (counter === documentSnapshots.docs.length)
                            {
                                if (typeof allRecordLoaded === "function")
                                {
                                    allRecordLoaded();
                                }
                            }
                        }
                    });
            }).catch((error) => console.error("Load error: ", error));
        }
        else
        {
            patch.limit(5).startAfter(window.lastVisible).get().then(documentSnapshots =>
            {
                window.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];

                let counter = 0;
                documentSnapshots.forEach(doc => 
                    {
                        if (doc.exists)
                        {
                            let item = doc.data();
                            window.allPlaylist.push(new Song(item.status, item.songName, item.songAutor, item.songPatch, item.imagePatch, doc.id));
                            if (typeof oneRecordLoaded === "function")
                            {
                                oneRecordLoaded();
                            }

                            counter++;
                            if (counter === documentSnapshots.docs.length)
                            {
                                if (typeof allRecordLoaded === "function")
                                {
                                    allRecordLoaded();
                                }
                            }
                        }
                    });
            }).catch((error) => console.error("Load error: ", error));
        }
    },

    bdAddNewDocInUserPlaylist : (dbSongId, then) =>
    {
        firebase.auth().onAuthStateChanged(function (user)
        {
            firebase.firestore().collection("users").doc(user.uid).collection("music").add
            ({
                patch: "/songs/" + dbSongId
            }).then(doc =>
            {
                if (typeof then == "function")
                {
                    then();
                }
            }).catch(error => {});
        });
    },

    bdGlobalSearch : (array, value, then) =>
    {
        let patch = firebase.firestore().collection("songs");

        patch.where("trackName", "==", value).get().then(documentSnapshots =>
        {
            let counter = 0;
            documentSnapshots.forEach(doc => 
            {
                let item = doc.data();
                array.push(new Song(item.status, item.songName, item.songAutor, item.songPatch, item.imagePatch, doc.id));

                counter++;
                if (counter === documentSnapshots.size)
                {
                    patch.where("autor", "==", value).get().then(documentSnapshots =>
                        {
                            documentSnapshots.forEach(doc => 
                            {
                                let item = doc.data();
                                array.push(new Song(item.status, item.songName, item.songAutor, item.songPatch, item.imagePatch, doc.id));
                                if (typeof then == "function")
                                {
                                    then();
                                }
                            });
                        });
                }
            });
        });
    }
};

export default Utils;