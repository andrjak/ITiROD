"use strict"

class Playlist {
    constructor(status, name, autor, tracks, imagePatch, publisher, publicationTime)
    {
        if (arguments.length < 6)
        {
            this.status = false;
            this.name = null;
            this.autor = null;
            this.tracks = null;
            this.imagePatch = null;
            this.publisher = null;
            this.publicationTime = null;
        }
        else
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
}

export default Playlist;