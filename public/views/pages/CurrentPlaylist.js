let CurrentPlaylist = {
    render : async () => {
        let view =
        `
        <link href="./styles/CurrentPlaylist.css" rel="stylesheet"/>
        <div class="container">
        <article class="card card-left">
            <div class="player">
                <img class="player-img" src="../source/music_base.png" alt="song cover" width="90%" height="66%"/>
                <div class="player-body">
                    
                    <div class="track-info" id="player-track">
                        <div id="album-name"></div>
                        <div id="track-name"></div>
                        <div id="track-time">
                            <div id="current-time"></div>
                            <div id="track-length"></div>
                        </div>
                    </div>

                    <div class="player-btn-group">
                        <div class="button" id="play-previous">
                          <i class="fas fa-backward"></i>
                        </div>

                        <div class="button" id="play-pause-button">
                          <i class="fas fa-play"></i>
                        </div>

                        <div class="button" id="play-next">
                          <i class="fas fa-forward"></i>
                        </div>
                    </div>

                </div>
            </div>
        </article>

        <article class="card card-right">
            <ul class="playlist" id="playlist">
                <li class="playlist-item">
                    <img class="playlist-item-img" src="../source/music_base.png" alt="song cover">
                    <div class="ctrl-btn-group">
                        <button class="ctrl-btn" type="image" name="play" alt="play">
                            <i class="fas fa-play"></i>
                        </button>
                        <button class="ctrl-btn" type="image" name="add" alt="add"/>
                        </button>
                        <button class="ctrl-btn" type="image" name="options" alt="options"/>
                        </button>
                    </div>
                </li>

                <li class="playlist-item">
                    <img class="playlist-item-img" src="../source/music_base.png" alt="song cover">
                    <div class="ctrl-btn-group">
                        <button class="ctrl-btn" type="image" name="play" alt="play">
                        <i class="fas fa-play"></i>
                        </button>
                        <button class="ctrl-btn" type="image" name="add" alt="add"/>
                        </button>
                        <button class="ctrl-btn" type="image" name="options" alt="options"/>
                        </button>
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

export default CurrentPlaylist;