import workerBuilder, { md5 } from "@findmybook/toolkit";
import axios from "axios";

const API_BASE_URL = "https://api.itbook.store/1.0/";
const API_SEARCH = `${API_BASE_URL}search/`;

const exampleManifest = {
    name: "ITBookStore",
    ip: "127.0.0.1",
    port: 3001,
    active: true,
    url: "http://127.0.0.1:3001",
    store: {
        id: "1",
        name: "ITBookStore",
        base_url: "https://itbook.store/",
    },
};

const searchHandler = async (textToSearch) => {
    let booksFound = await axios.get(API_SEARCH + textToSearch);
    booksFound = booksFound.data.books;

    const booksInCorrectStructure = booksFound.map((book) => {
        return {
            name: book.title,
            author: "mockauthor",
            md5: md5(book.title + "mockauthor"),
            url_paths: [
                {
                    storeId: "1",
                    storeName: "ITBookStore",
                    url: book.url,
                },
            ],
        };
    });

    return booksInCorrectStructure;
};

const store = workerBuilder();
