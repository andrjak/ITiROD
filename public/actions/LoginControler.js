"use strict"

function init()
{
    let signInElement   = document.getElementById("ok");
    let emailElement    = document.getElementById("email");
    let passwordElement = document.getElementById("password");

    signInElement.addEventListener("click", () => 
    {
        firebase.auth().signInWithEmailAndPassword(emailElement.value, passwordElement.value).then(() =>
        {
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
    });
}

export default init;