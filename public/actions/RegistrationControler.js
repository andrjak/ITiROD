"use strict"

function init()
{
    let signUpElement         = document.getElementById("ok");
    let emailElement          = document.getElementById("email");
    let passwordElement       = document.getElementById("password");
    let repeatPasswordElement = document.getElementById("repeat-password");

    function execute()
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
            passwordElement.value = "";
            document.location.href = "/#/MyMusic";
        }).catch(
        error =>
        {
            let errorCode = error.code;
            let errorMessage = error.message;
            alert("Error" + errorCode + ": " + errorMessage);
        });
    }

    signUpElement.addEventListener("click", execute);
    document.addEventListener('keydown', event =>
    {
        if (event.keyCode === 13 && passwordElement.value !== "")
        {
            execute();
        }
    });
}

export default init;