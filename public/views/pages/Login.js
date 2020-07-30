import LoginControler from "../../actions/LoginControler.js";

let Login = {
    render : async () => {
        let view =
        `
        <div class="bacground-log-reg">
            <div class="main-form">
                <input class="form-item" type="text" id="email" name="email" placeholder="Email" maxlength="100"/>
                <input class="form-item" type="password" id="password" name="password" placeholder="Password" maxlength="50">
                <button class="form-item" id="ok" name="Ok">Login</button>
                <a class="form-item" href="/#/Registration">Registration</a>
            </div>
        <div>
        `
        return view
    },
    after_render : async () => 
    {
        LoginControler();
    }
}

export default Login;