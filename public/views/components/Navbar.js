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
        document.getElementById("exit-btn").addEventListener("click", () =>
        {
            firebase.auth().signOut().then(function() 
            {
                // Sign-out successful.
                document.location.href = "/#/Login";
            }).catch(function(error) 
            {
                alert("Something went wrong:" + error);
                // An error happened.
            }); 
        });
    }
}

export default navbar;