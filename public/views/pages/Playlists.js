let Playlists = {
    render : async () => {
        let view =
        `
        <link href="./styles/Playlists.css" rel="stylesheet"/>
        <div class="scroler">
        <ul class="scroler-body" id="scroler_list">
            <li class="scroler-item">
                <img class="album-img" src="../source/music_base.png" alt="Album cover"/>
                <form class="button-group">
                    <button class="button" type="image" name="play" alt="play" id="play-button">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="button" type="image" name="delete" alt="delete" id="delete-button">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </form>
            <li>
        </ul>
        </div>
        `
        return view
    },
    after_render : async () => 
    {

    }
}

export default Playlists;