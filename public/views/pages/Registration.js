import RegistrationControler from "../../actions/RegistrationControler.js";

let Registration = {
    render : async () => {
        let view =
        `
        <div class="bacground-log-reg">
            <div class="main-form">
                <input class="form-item" type="text" id="email" name="email" placeholder="Email" maxlength="100"/>
                <input class="form-item" type="password" id="password" name="password" placeholder="Password" maxlength="50">
                <input class="form-item" type="password" id="repeat-password" name="password" placeholder="Repeat password" maxlength="50">
                <button class="form-item" id="ok" name="ok">OK</button>
            </div>
        <div>
        `
        return view
    },
    after_render : async () => 
    {
        RegistrationControler();
    }
}

export default Registration;