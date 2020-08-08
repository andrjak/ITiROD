"use strict"

function ModalPageControler(mode, imageSrc)
{
    let modalPage = document.getElementById("modal-page");
    let modalImage = document.getElementById("modal_song_img");
    let modalUpdateButton = document.getElementById("modal-update-button");
    let modalCancelButton = document.getElementById("modal-cancel-button");
    let modalImageButton = document.getElementById("modal-get-image-button");

    let modalNameInput = document.getElementById("modal-name");
    let modalAutorInput = document.getElementById("modal-autor");
    let modalSongPatchInput = document.getElementById("modal-song-patch");
    let modalImagePatchInput = document.getElementById("modal-img-field");
    //let exitButton = document.getElementById("modal-close-button");

    modalImage.src = imageSrc;

    modalCancelButton.addEventListener("click", (event) => 
    {
        modalPage.classList.remove("active"); 
    });

    // modalImageButton.addEventListener("click", (event) => 
    // {
    //     console.log("event");
    //     console.dir(modalImagePatchInput.files[0]);
    //     if (modalImagePatchInput.files[0] !== undefined)
    //     {
    //         modalImage.src = modalImagePatchInput.files[0];
    //     }
    // });

    modalImagePatchInput.addEventListener("change", (event) =>
    {
        console.dir(event.target.files);
        console.dir(event.target);
        if (event.target.files[0] !== undefined)
        {
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

    modalUpdateButton.addEventListener("click", (event) =>
    {

    });
    //alert("Options: Don't Work!");
}

export default ModalPageControler;