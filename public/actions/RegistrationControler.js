"use strict"

function init()
{
    let signUpElement         = document.getElementById("ok");
    let emailElement          = document.getElementById("email");
    let passwordElement       = document.getElementById("password");
    let repeatPasswordElement = document.getElementById("repeat-password");

    signUpElement.addEventListener("click", () => 
    {
        if (passwordElement.value !== repeatPasswordElement.value)
        {
            repeatPasswordElement.value = "";
            alert("Password and repeated password do not match!");
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(emailElement.value, passwordElement.value).then(
        data =>
        {
            document.location.href = "/#/MyMusic";
        }).catch(
        error =>
        {
            let errorCode = error.code;
            let errorMessage = error.message;
            alert("Error" + errorCode + ": " + errorMessage);
        });
    });
}

export default init;