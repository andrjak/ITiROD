let Login = {
    render : async () => {
        let view =
        `
        <div class="bacground-log-reg">
            <form class="main-form">
                <input class="form-item" type="text" id="email" name="email" placeholder="Email" maxlength="100"/>
                <input class="form-item" type="password" id="password" name="password" placeholder="Password" maxlength="50">
                <button class="form-item" id="ok" name="Ok">Login</button>
                <a class="form-item" href="/#/Registration">Registration</a>
            </form>
        <div>
        `
        return view
    },
    after_render : async () => 
    {
        let emailElement = document.getElementById("email");
        let passwordElement = document.getElementById("password");
        document.getElementById("ok").addEventListener("click", () => 
        {
            // let email = emailElement.value.trim();
            // let password = passwordElement.value.trim();

            // firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // // ...
            // });
            // document.location.href = "/#/MyMusic";
        });
    }
}

export default Login;