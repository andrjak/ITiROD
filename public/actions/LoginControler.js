"use strict"

function init()
{
    let signInElement   = document.getElementById("ok");
    let emailElement    = document.getElementById("email");
    let passwordElement = document.getElementById("password");

    function execute()
    {
        firebase.auth().signInWithEmailAndPassword(emailElement.value, passwordElement.value).then(() =>
        {
            passwordElement.value = "";
            document.location.href = "/#/CurrentPlaylist";
        }).catch(
            (error) =>
            {
                let errorCode = error.code;
                let errorMessage = error.message;
                
                if (errorCode === "auth/wrong-password") 
                {
                    alert("Wrong password.");
                    passwordElement.value = "";
                } 
                else 
                {
                    alert("Error" + errorCode + ": " + errorMessage);
                }
            });
    }

    signInElement.addEventListener("click", execute);
    document.addEventListener('keydown', event =>
    {
        if (event.keyCode === 13 && passwordElement.value !== "") 
        {
            execute();
        }
    });
}

export default init;