# Book object

Each worker responses with either a books array or a single book as a response.

`name` - **required** string, book name as received from store.

`author` - **required** string, book's author name as received from store.

`url_paths` - **required** - array, array of path objects.

### Optional

`md5` - string, an md5 hash of the book name + author name. both after removing special characters.

`poster` - string, URL to the book's cover.

`description` - string, book's synopsis.

`publishing` - string, The book's publisher.

`translator` - string, This publishing, translator name.

`publishing_date` - string, The publishing date.

`pages` - number, amount of pages in book.

`isbn` - string, the book's [ISBN](https://en.wikipedia.org/wiki/International_Standard_Book_Number).

`danacode` - string, the book's [Danacode](http://www.danacode.co.il/).

`editions` - array, array containing one or more edition.

### Edition Object

`print` - string, either `paperbook`, `digital` or `secondhand`.

`price` - number, edition's price in shekels.

### Path Object

`storeId` - string, book store id.

`storeName` - string, store name.

`url` - string, full URL to the book in the store's website.

#### Book object - example

```JSON
{
  "name": "ללכת בדרכך",
  "author": "ג'וג'ו מויס",
  "url_paths": [
    {
      "storeId": "1",
      "storeName": "e-vrit",
      "url": "https://www.e-vrit.co.il/Product/2740/%D7%9C%D7%9C%D7%9B%D7%AA_%D7%91%D7%93%D7%A8%D7%9B%D7%9A"
    }
  ],
  "md5": "64868a704bdf1b58f289a0e3c4813d71",
  "poster": "https://images-evrit.yit.co.il/Images/Products/Ebooks/me_before_you_master.jpg",
  "description": "הספר הזה יגנוב את לבכם, ישבור אותו וירכיב אותו מחדש…\n\"ואם הייתי אומר לך שאני לא רוצה שתהיי כאן?\"\n\"אתה לא המעסיק שלי. אמא שלך המעסיקה שלי. ועד שהיא לא תגיד לי...",
  "publishing": "ידיעות ספרים",
  "publishing_date": "אפריל 2014",
  "translator": "קטיה בנוביץ'",
  "pages": 407,
  "isbn": "978-965-545-826-8",
  "danacode": "362-5002",
  "editions": [
    {
      "print": "paperbook",
      "price": 50
    },
    {
      "print": "digital",
      "price": 31
    }
  ]
}
```
