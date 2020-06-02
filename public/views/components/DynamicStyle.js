let DynamicStyle = {
    CurrentPlaylistStyle : async () => {
        let style =
        `
        <link href="./styles/CurrentPlaylist.css" rel="stylesheet"/>
        `
        return style
    },
    MyMusicStyle : async () => 
    {
        let style =
        `
        <link href="./styles/MyMusic.css" rel="stylesheet"/>
        `
        return style
    },
    PlaylistsStyle : async () =>
    {
        let style =
        `
        <link href="./styles/Playlists.css" rel="stylesheet"/>
        `
        return style
    },
    LoginRegistrationStyle : async () =>
    {
        let style =
        `
        <link href="./styles/LoginRegistration.css" rel="stylesheet"/>
        `
        return style
    },

}

export default DynamicStyle;