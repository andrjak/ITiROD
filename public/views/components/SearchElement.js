"use strict"

import SearchControler from "../../actions/SearchControler.js";

let searchBar = 
{
    render : async () => 
    {
        let view =
        `<div class="form-search">
            <input class="form-search-text" type="text" placeholder="Search" aria-label="Search"/>
            <input class="form-search-btn" type="image" src="../source/Search.png" name="search" alt="search"/>
        </div>
        <button id="create-new-song-button" class="modal-button">
        Add new song
        </button>`

        return view;
    },

    after_render : async () => 
    {
        await SearchControler();
    }
}

export default searchBar;