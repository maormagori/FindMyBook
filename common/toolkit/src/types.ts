type store = {
    id: string | number;
    name: string;
    base_url: string;
};

export type manifest = {
    name: string;
    ip?: string;
    port?: number;
    active: boolean;
    url: string;
    store: store;
};

type path = {
    storeId: string | number;
    name: string;
    url: string;
};

type edition = {
    print: "paperbook" | "digital" | "secondhand";
    price: number;
};

export type book = {
    name: string;
    author: string;
    url_paths: path[];
    md5: string;
    poster?: string;
    description?: string;
    publishing?: string;
    translator?: string;
    publishing_date?: string;
    pages?: number;
    isbn?: string;
    danacode?: string;
    editions: edition[];
};
