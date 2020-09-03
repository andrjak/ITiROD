"use stricct"

class Song {
    constructor(status, trackName, autor, trackPatch, imagePatch, dbId)
    {
        this.status = status;
        this.trackName = trackName;
        this.autor = autor;
        this.trackPatch = trackPatch;
        this.imagePatch = imagePatch;
        this.dbId = dbId;
    }
}

export default Song;