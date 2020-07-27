let MyMusic = {
    render : async () => {
        let view =  /*html*/
        `
                <link href="./styles/MyMusic.css" rel="stylesheet"/>
                <div class="container">
                        <article class="card card-right">
                            <ul class="playlist" id="my_playlist">
                                <li class="playlist-item">
                                    <img class="playlist-item-img" src="../source/music_base.png" alt="song cover" width="70" height="70">
                                    <div class="ctrl-btn-group">
                                        <button class="ctrl-btn" type="image" name="play" alt="play">
                                        <i class="fas fa-play"></i>
                                        </button>
                                        <button class="ctrl-btn" type="image" name="add" alt="add">
                                        </button>
                                        <button class="ctrl-btn" type="image" name="options" alt="options">
                                        </button>
                                    </div>
                                </li>
            
                                <li class="playlist-item">
                                    <img class="playlist-item-img" src="../source/music_base.png" alt="song cover" width="70" height="70">
                                    <div class="ctrl-btn-group">
                                        <button class="ctrl-btn" type="image" name="play" alt="play">
                                        <i class="fas fa-play"></i>
                                        </button>
                                        <button class="ctrl-btn" type="image" name="add" alt="add">
                                        </button>
                                        <button class="ctrl-btn" type="image" name="options" alt="options">
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </article>
        
                        <article class="card card-right">
                        <ul class="playlist" id="my_playlist">
                            <li class="playlist-item">
                                <img class="playlist-item-img" src="../source/music_base.png" alt="song cover" width="70" height="70">
                                <div class="ctrl-btn-group">
                                    <input class="ctrl-btn" type="image" name="play" alt="play"/>
                                    <input class="ctrl-btn" type="image" name="add" alt="add"/>
                                    <input class="ctrl-btn" type="image" name="options" alt="options"/>
                                </div>
                            </li>
        
                            <li class="playlist-item">
                                <img class="playlist-item-img" src="../source/music_base.png" alt="song cover" width="70" height="70">
                                <div class="ctrl-btn-group">
                                    <input class="ctrl-btn" type="image" name="play" alt="play"/>
                                    <input class="ctrl-btn" type="image" name="add" alt="add"/>
                                    <input class="ctrl-btn" type="image" name="options" alt="options"/>
                                </div>
                            </li>
                        </ul>
                        </article>
                </div>
        `
        return view
    },
    after_render : async () => 
    {

    }
}

export default MyMusic;