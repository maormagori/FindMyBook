# Worker

A worker is container running a book store scraper.</br>
A worker can be outsourced. As long as it respond to the protocols and passes the tests it could be added as a new store.

### Protocols

|          **Path**           | **Type** |          **Data**          |                                                                                         **Returns**                                                                                          |
| :-------------------------: | :------: | :------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|      `/manifest.json`       |   GET    |             -              |                                                                a JSON with a workers manifest. There's an example at the end.                                                                |
| `/search?text=SEARCH_QUERY` |   GET    |             -              |           a JSON with a single `books` attribute containg an array of [book object](./book.md).<br>The books represent the query's search results.<br> Example: `{ books: [...]}`.           |
|       `/populateBook`       |  PATCH   | a [book object](./book.md) | a JSON with a single `book` attribute containing a [book object](./book.md). <br>The book will be the the same book from the request, with updated properties. <br> Example: `{book: {...}}` |

### Manifest

A worker's manifest is a JSON object containg all the relevant information to the backend server.

#### Example

```JSON
{
    "name": "E-vrit Worker", //The name of the container.
    "ip": "127.0.0.1" , //Container ip. used in development.
    "port": "3001", //Container port. used in development.
    "active": true, //Wether or not to use this worker
    "url": "https://www.evritworker.example/", //The worker's path
    "store": {
        "id": "14", //Store's identifier
        "name": "E-vrit", //Store name.
        "base_url": "https://www.e-vrit.co.il/" // Store site's url.
    }

}
```
