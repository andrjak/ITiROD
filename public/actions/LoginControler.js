"use strict"

function init()
{
    let signInElement   = document.getElementById("ok");
    let emailElement    = document.getElementById("email");
    let passwordElement = document.getElementById("password");

    signInElement.addEventListener("click", () => 
    {
        let flag = false;
        firebase.auth().signInWithEmailAndPassword(emailElement.value, passwordElement.value).catch(
            function (error) 
            {
                let errorCode = error.code;
                let errorMessage = error.message;
                flag = true;
                
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

        if (!flag)
        {
            document.location.href = "/#/CurrentPlaylist";
        }
    });
}

export default init;