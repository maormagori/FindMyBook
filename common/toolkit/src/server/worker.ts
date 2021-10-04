import { manifest, book } from "../types";

type searchHandler = (textToSearch: string) => Promise<book[]>;
type getBookHandler = (requestedBook: book) => Promise<book>;

export type workerHandlers = {
    searchHandler?: searchHandler;
    getBookHandler?: getBookHandler;
};

class worker {
    manifest: manifest;
    handlers: workerHandlers;

    constructor(workerManifest: manifest, handlers: workerHandlers = {}) {
        this.manifest = Object.freeze(workerManifest);
        this.handlers = handlers;
    }

    setSearchHandler(handlerFunction: searchHandler): worker {
        this.handlers.searchHandler = handlerFunction;
        return this;
    }

    setGetBookHandler(handlerFunction: getBookHandler): worker {
        this.handlers.getBookHandler = handlerFunction;
        return this;
    }

    //TODO: add handlers and manifest validation
}
