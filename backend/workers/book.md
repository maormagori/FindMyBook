# Book object

Each worker responses with either a books array or a single book as a response.

`name` - **required** string, book name as received from store.

`author` - **required** string, book's author name as received from store.

`url_path` - **required** - string, book's url without base url.

### Optional

`md5` - string, an md5 hash of the book name + author name. both after removing special characters.

`poster` - string, URL to the book's cover.

`description` - string, book's synopsis.

`publishing` - string, The book's publisher.

`publishing_date` - string, The publishing date.

`pages` - number, amount of pages in book.

`isbn` - string, the book's [ISBN](https://en.wikipedia.org/wiki/International_Standard_Book_Number).

`danacode` - string, the book's [Danacode](http://www.danacode.co.il/).

`editions` - array, array containing one or more edition.

`edition` - object, containing `print` and `price`.

`print` - string, either `paperbook`, `digital` or `secondhand`.

`price` - number, edition's price in shekels.
