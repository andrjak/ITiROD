"use strict"

function ModalPageControler(imageButtonSrc)
{
    let modalPage = document.getElementById("modal-page");
    let imageButton = document.getElementById("modal-get-image-button");
    let exitButton = document.getElementById("modal-close-button");

    imageButton.src = imageButtonSrc;

    exitButton.addEventListener("click", (event) => { modalPage.classList.remove("active"); });
    //alert("Options: Don't Work!");
}

export default ModalPageControler;