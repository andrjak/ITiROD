import NavbarControler from "../../actions/NavbarControler.js";

let navbar = {
    render : async () => {
        let view =  /*html*/
        `
        <nav>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="/#/CurrentPlaylist">Current Playlist</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/#/MyMusic">My Music</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/#/Playlists">Play Lists</a>
                </li>
                <li id="exit-btn" class="nav-item">
                    <a class="nav-link" href="/#/Login">Exit</a>
                </li>
            </ul>
        </nav>
        `
        return view
    },
    after_render : async () => 
    {
        NavbarControler();
    }
}

export default navbar;