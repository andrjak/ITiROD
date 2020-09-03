"use strict"

class Playlist {
    constructor(status, name, autor, tracks, imagePatch, publisher, publicationTime)
    {
        this.status = status;
        this.name = name;
        this.autor = autor;
        this.tracks = tracks;
        this.imagePatch = imagePatch;
        this.publisher = publisher;
        this.publicationTime = publicationTime;
    }
}

export default Playlist;