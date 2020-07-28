import AudioControler from "../../actions/Audio.js"

let MyMusic = {
    render : async () => {
        let view =  /*html*/
        `
        <article class="card card-left">
            <div class="player">
                <img id="player-img" class="player-img" src="../source/music_base.png" alt="song cover"/>
                <div class="player-body">
                    
                    <div class="track-info" id="player-track">
                        <div id="track-name"></div>
                        <em id="autor-name"></em>
                        <div id="s-area">
                            <div id="ins-time"></div>
                            <div id="s-hover"></div>
                            <div id="seek-bar"></div>
                        </div>
                        <div id="track-time">
                            <div id="current-time"></div>
                            <div id="track-length"></div>
                        </div>
                    </div>

                    <div class="player-btn-group">
                        <button class="button" id="play-previous">
                        <i class="fas fa-backward"></i>
                        </button>

                        <button class="button" id="play-pause-button">
                        <i class="fas fa-play"></i>
                        </button>

                        <button class="button" id="play-next">
                        <i class="fas fa-forward"></i>
                        </button>

                        <button class="button" id="play-mix">
                            <i class="fas fa-random"></i>
                        </button>

                        <button class="button" id="play-repeat">
                            <i class="fas fa-redo-alt"></i>
                        </button>
                    </div>

                </div>
            </div>
        </article>

        <article class="card card-right">
            <ul id="playlist" class="playlist">
                <!-- <li class="playlist-item">
                    <img class="playlist-item-img" src="./source/music_base.png" alt="song cover">
                    <div class="ctrl-btn-group">
                        <button class="ctrl-btn" type="image" name="play" alt="play">
                            <i class="fas fa-play"></i>
                        </button>
                        <button class="ctrl-btn" type="image" name="add" alt="add">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="ctrl-btn" type="image" name="options" alt="options">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                </li>

                <li class="playlist-item">
                    <img class="playlist-item-img" src="./source/music_base.png" alt="song cover">
                    <div class="ctrl-btn-group">
                        <button class="ctrl-btn" type="image" name="play" alt="play">
                            <i class="fas fa-play"></i>
                        </button>
                        <button class="ctrl-btn" type="image" name="add" alt="add">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="ctrl-btn" type="image" name="options" alt="options">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                </li> -->
            </ul>
        </article>
        <!--<script defer src="../../actions/Audio.js"></script>-->
        `
        return view
    },
    after_render : async () => 
    {
        AudioControler();
    }
}

export default MyMusic;