"use strict"

let searchBar = 
{
    render : async () => 
    {
        let view =
        `<div class="form-search">
            <input id="search-input" class="form-search-text" type="text" placeholder="Search" aria-label="Search"/>
            <input id="search-button" class="form-search-btn" type="image" src="../source/Search.png" name="search" alt="search"/>
        </div>`

        return view;
    },

    after_render : async () => 
    {
    }
}

export default searchBar;