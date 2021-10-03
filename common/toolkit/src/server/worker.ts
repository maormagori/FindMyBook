import { manifest, book } from "../types";

class workerBuilder {
    manifest: manifest;
    handlers?: {
        searchHandler: (book: book) => book[];
        getBookHandler: (book: book) => book;
    };

    constructor(
        workerManifest: manifest,
        handlers?: {
            searchHandler: (book: book) => book[];
            getBookHandler: (book: book) => book;
        }
    ) {
        this.manifest = Object.freeze(workerManifest);
        this.handlers = handlers;
    }
}
