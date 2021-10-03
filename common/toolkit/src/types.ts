type store = {
    id: string|number,
    name: string,
    base_url: string
};

export type manifest = {
    name: string,
    ip?: string,
    port?: number,
    active: boolean,
    url: string,
    store: store
}