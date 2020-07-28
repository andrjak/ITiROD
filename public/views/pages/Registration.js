let Registration = {
    render : async () => {
        let view =
        `
            <form>
                <input class="form-item" type="text" name="email" placeholder="Email" maxlength="100"/>
                <input class="form-item" type="password" name="password" placeholder="Password" maxlength="50">
                <button class="form-item" name="ok">OK</button>
            </form>
        `
        return view
    },
    after_render : async () => 
    {
        // let emailElement = document.getElementById("email");
        // let passwordElement = document.getElementById("password");
        // document.getElementById("ok").addEventListener("click", () => 
        // {
        //     let email = emailElement.value.trim();
        //     let password = passwordElement.value.trim();

        //     firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) 
        //     {
        //         // Handle Errors here.
        //         var errorCode = error.code;
        //         var errorMessage = error.message;
        //         // ...
        //     });
        //     document.location.href = "/#/MyMusic";
        // });
    }
}

export default Registration;