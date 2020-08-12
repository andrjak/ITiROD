"use strict"

import Utils from ".././actions/Utils.js";

function ModalPageControler(mode, imageSrc, songName, songAutor)
{
    let modalPage = document.getElementById("modal-page");
    let modalImage = document.getElementById("modal_song_img");
    let modalUpdateButton = document.getElementById("modal-update-button");
    let modalCancelButton = document.getElementById("modal-cancel-button");
    let modalImageButton = document.getElementById("modal-get-image-button");
    let modalSongLabel = document.getElementById("modal-song-label");
    let modalSongText = document.getElementById("modal-song-text");

    let modalNameInput = document.getElementById("modal-name");
    let modalAutorInput = document.getElementById("modal-autor");
    let modalSongPatchInput = document.getElementById("modal-song-patch");
    let modalImagePatchInput = document.getElementById("modal-img-field");
    let modalStatusInput = document.getElementById("modal-status");

    let user = firebase.auth().currentUser;

    // Обновляемые переменные файлов
    let imageFile = undefined;
    let songFile = undefined;

    modalCancelButton.addEventListener("click", (event) =>
    {
        modalPage.classList.remove("active"); 
    });

    modalPage.addEventListener("dragenter", (event) =>
    {
        event.stopPropagation();
        event.preventDefault();
    });

    modalPage.addEventListener("dragover", (event) =>
    {
        event.stopPropagation();
        event.preventDefault();
    });

    modalPage.addEventListener("drop", (event) =>
    {
        if (mode == "create")
        {
            event.stopPropagation();
            event.preventDefault();
        
            let data = event.dataTransfer;
            modalSongText.textContent = data.files[0].name;
        }
        //handleFiles(data.files);
    });

    modalImagePatchInput.addEventListener("change", (event) =>
    {
        if (event.target.files[0] !== undefined)
        {
            imageFile = event.target.files[0];
            modalImage.file = event.target.files[0];
            var reader = new FileReader();
            reader.onload = (
                function(aImg) 
                { 
                    return function(e) 
                    {
                        aImg.src = e.target.result;
                    };
                })(modalImage);
            reader.readAsDataURL(event.target.files[0]);
        }
    });

    modalSongPatchInput.addEventListener("change", (event) =>
    {
        if (event.target.files[0] !== undefined)
        {
            songFile = event.target.files[0];
            modalSongText.textContent = songFile.name;
        }
    });

    modalUpdateButton.addEventListener("click", (event) =>
    {
        let nameValue = modalNameInput.value.trim();
        let autorValue = modalAutorInput.value.trim();
        let createTime = Utils.timeLabelCreater();

        if (nameValue == undefined || nameValue == null || nameValue == "")
        {
            alert("Need to add a name!");
            return;
        }

        if (songFile == undefined)
        {
            alert("Song not added!");
            return;
        }

        let dbSongName = "songs/" + user.uid + "time" + createTime + songFile.name;
        firebase.storage().ref(dbSongName)
        .put(songFile).then(function(snapshot)
        {
            console.log("song-load");
        });

        let dbImageName = undefined;
        if (modalImage.src !== imageSrc && imageFile !== undefined)
        {
            dbImageName = "images/" + user.uid + "time" + createTime + imageFile.name;
            firebase.storage().ref(dbImageName)
            .put(imageFile).then(function(snapshot)
            {
                console.log("image-load");
            });
        }

        let dbSongId = user.uid + "time" + createTime;
        firebase.firestore().collection("songs").doc(dbSongId).set(
            {
                imagePatch: "gs://itirod-9196a.appspot.com/images/" + dbImageId ,
                songAutor: autorValue,
                songName: nameValue,
                songPatch: "gs://itirod-9196a.appspot.com/songs/" + dbSongName,
                status: modalStatusInput.checked
            })
            .then(() =>
            {
                console.log("Document successfully written!");
            })
            .catch((error) =>
            {
                console.error("Error writing document: ", error);
            });
    });

    ModalPageControler = (localMode, imageSrc, songName, songAutor) =>
    {
        mode = localMode;
        imageFile = undefined;
        songFile = undefined;
        modalImage.src = imageSrc;
        modalSongText.textContent = "Select file (can drop)";
        modalNameInput.value = (songName != undefined && songName != null) ? songName : "";
        modalAutorInput.value = (songAutor != undefined && songAutor != null) ? songAutor : "";

        if (mode == "create")
        {
            modalSongLabel.classList.remove("active");
            modalSongLabel.classList.add("active");
        }
        else if (mode == "update")
        {
            modalSongLabel.classList.remove("active");
        }
    }

    ModalPageControler(mode, imageSrc, songName, songAutor);
}

export default ModalPageControler;