class Song {
    constructor(status, trackName, autor, trackPatch, imagePatch, publisher, publicationTime)
    {
        if (arguments.length < 7)
        {
            this.status = false;
            this.trackName = null;
            this.autor = null;
            this.trackPatch = null;
            this.imagePatch = null;
            this.publisher = null;
            this.publicationTime = null;
        }
        else
        {
            this.status = status;
            this.trackName = trackName;
            this.autor = autor;
            this.trackPatch = trackPatch;
            this.imagePatch = imagePatch;
            this.publisher = publisher;
            this.publicationTime = publicationTime;
        }
    }
}

export default Song;