"use strict"

function init()
{
    let exitElement = document.getElementById("exit-btn");

    exitElement.addEventListener("click", () =>
    {
        firebase.auth().signOut().then(function()
        {
            // Sign-out successful.
            document.location.href = "/#/Login";
        }).catch(function(error) 
        {
            alert("Something went wrong:" + error);
        }); 
    });
}

export default init;