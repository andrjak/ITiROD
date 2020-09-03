"use strict"

function init()
{
    let exitElement = document.getElementById("exit-btn");

    exitElement.addEventListener("click", () =>
    {
        firebase.auth().signOut().then(function()
        {
            // Sign-out successful.
            window.audio.pause();
            window.audio = undefined;
            document.location.href = "/#/Login";
            window.location.reload(true);
        }).catch(function(error)
        {
            alert("Something went wrong:" + error);
        }); 
    });
}

export default init;