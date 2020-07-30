"use strict"

// Скрипт для управления навигацией
import Utils from "./actions/Utils.js";

// Визуальные эелементы
import Navbar from "./views/components/Navbar.js";

// Страницы
import Login from "./views/pages/Login.js";
import Registration from "./views/pages/Registration.js";
import MyMusic from "./views/pages/MyMusic.js";
import CurrentPlaylist from "./views/pages/CurrentPlaylist.js";
import Playlists from "./views/pages/Playlists.js";

// Supported routes
const routes =
{
    "/Login"           : Login,
    "/registration"    : Registration,
    "/mymusic"         : MyMusic,
    "/"                : MyMusic,
    "/currentplaylist" : CurrentPlaylist,
    "/playlists"       : Playlists
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

    content.innerHTML = await page.render(); // Прорисовка выбранной страницы
    await page.after_render();
}

window.addEventListener("hashchange", router);

window.addEventListener("load", router);
