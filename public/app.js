"use strict"

import Utils from "./actions/Utils.js";

import Navbar from "./views/components/Navbar.js";
import DynamicStyle from "./views/components/DynamicStyle.js";

import Login from "./views/pages/Login.js";
import Registration from "./views/pages/Registration.js";
import MyMusic from "./views/pages/MyMusic.js";
import CurrentPlaylist from "./views/pages/CurrentPlaylist.js";
import Playlists from "./views/pages/Playlists.js";

// document.addEventListener("DOMContentLoaded", event => {
//     const app = firebase.app();
// });

// Supported routes
const routes =
{
    "/login" : Login,
    "/registration": Registration,
    "/mymusic" : MyMusic,
    "/currentplaylist" : CurrentPlaylist,
    "/playlists" : Playlists
}

const router = async () => 
{
    // Lazy load view element:
    const dynamic_style = null || document.getElementById("dynamic-styles");
    const navbar = null || document.getElementById("navbar");
    const content = null || document.getElementById("app-root");

    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? "/" + request.resource : "/") + (request.id ? "/:id" : "") + (request.verb ? "/" + request.verb : "")

    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Login

    switch (page)
    {
        case Login:
            dynamic_style.innerHTML = await DynamicStyle.LoginRegistrationStyle();
            break;
        case Registration:
            dynamic_style.innerHTML = await DynamicStyle.LoginRegistrationStyle();
            break;
        case MyMusic:
            dynamic_style.innerHTML = await DynamicStyle.MyMusicStyle();
            break;
        case CurrentPlaylist:
            dynamic_style.innerHTML = await DynamicStyle.CurrentPlaylistStyle();
            break;
        case Playlists:
            dynamic_style.innerHTML = await DynamicStyle.PlaylistsStyle();
            break;
    }

    if (page !== Login && page !== Registration)
    {
        navbar.innerHTML = await Navbar.render();
        await Navbar.after_render();
    }
    else 
    {
        while (navbar.firstChild) 
        {
            navbar.removeChild(navbar.firstChild);
        }
    }

    content.innerHTML = await page.render();
    await page.after_render();
}

// Listen on hash change:
window.addEventListener("hashchange", router);

// Listen on page load:
window.addEventListener("load", router);
