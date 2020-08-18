"use strict"

import Utils from "./actions/Utils.js";

import Navbar from "./views/components/NavbarElement.js";
import Searchbar from "./views/components/SearchElement.js";

import Login from "./views/pages/LoginPage.js";
import Registration from "./views/pages/RegistrationPage.js";
import MyMusic from "./views/pages/MyMusicPage.js";
import CurrentPlaylist from "./views/pages/CurrentPlaylistPage.js";
import Playlists from "./views/pages/PlaylistsPage.js";


// Supported routes
const routes =
{
    "/login"           : Login,
    "/registration"    : Registration,
    "/mymusic"         : MyMusic,
    "/"                : MyMusic,
    "/currentplaylist" : CurrentPlaylist,
    /*"/playlists"       : Playlists*/
};

const router = async () => 
{
    const navbar = null || document.getElementById("navbar");
    const content = null || document.getElementById("app-root");
    const searchbar = null || document.getElementById("searchbar");

    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL();

    let parsedURL = (request.resource ? "/" + request.resource : "/") + (request.id ? "/:id" : "") + (request.verb ? "/" + request.verb : "");

    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : CurrentPlaylist;

    if (firebase.auth().currentUser === null && (page !== Login && page !== Registration))
    {
        document.location.href = "/#/Login";
        page = Login;
    }

    if (page !== Login && page !== Registration) // Динамическое добавления navbar на страницы кроме регистрации и входа
    {
        navbar.innerHTML = await Navbar.render();
        await Navbar.after_render();
    }
    else 
    {
        navbar.innerHTML = "";
    }

    if (page == MyMusic)
    {
        searchbar.innerHTML = await Searchbar.render();
        await Searchbar.after_render();
    }
    else
    {
        searchbar.innerHTML = "";
    }

    content.innerHTML = await page.render(); // Прорисовка выбранной страницы
    await page.after_render();
}

window.addEventListener("hashchange", router);

window.addEventListener("load", router);
