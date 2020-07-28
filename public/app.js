"use strict"

// Скрипт для управления навигацией
import Utils from "./actions/Utils.js";

// Визуальные эелементы
import Navbar from "./views/components/Navbar.js";
import DynamicStyle from "./views/components/DynamicStyle.js";

// Страницы
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
    "/Login" : Login,
    "/registration": Registration,
    "/mymusic" : MyMusic,
    "/currentplaylist" : CurrentPlaylist,
    "/playlists" : Playlists
};

const router = async () => 
{
    const dynamicStyle = null || document.getElementById("dynamic-styles");
    const navbar = null || document.getElementById("navbar");
    const content = null || document.getElementById("app-root");
    const searchbar = null || document.getElementById("searchbar");

    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL();

    let parsedURL = (request.resource ? "/" + request.resource : "/") + (request.id ? "/:id" : "") + (request.verb ? "/" + request.verb : "");

    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Login;

    // switch (page) //!!! Динамическая загрузка стиля для каждой конкретной страницы
    // { // Нужно лучше продумать этот момент
    //     case Login:
    //         dynamicStyle.innerHTML = await DynamicStyle.LoginRegistrationStyle();
    //         break;
    //     case Registration:
    //         dynamicStyle.innerHTML = await DynamicStyle.LoginRegistrationStyle();
    //         break;
    //     case MyMusic:
    //         dynamicStyle.innerHTML = await DynamicStyle.MyMusicStyle();
    //         break;
    //     case CurrentPlaylist:
    //         dynamicStyle.innerHTML = await DynamicStyle.CurrentPlaylistStyle();
    //         break;
    //     case Playlists:
    //         dynamicStyle.innerHTML = await DynamicStyle.PlaylistsStyle();
    //         break;
    // }

    if (page !== Login && page !== Registration) // Динамическое добавления navbar на страницы кроме регистрации и входа
    {
        navbar.innerHTML = await Navbar.render();
        await Navbar.after_render();
    }
    else 
    {
        while (navbar.firstChild) //!!! Очистка navbar возможно стоит переделать
        {
            navbar.removeChild(navbar.firstChild);
        }
    }

    content.innerHTML = await page.render(); // Прорисовка выбранной страницы
    await page.after_render();
}

window.addEventListener("hashchange", router);

window.addEventListener("load", router);
