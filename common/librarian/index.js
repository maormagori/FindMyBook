const mergeBooks = (books) => {
    if (!books) throw new TypeError("books array is undefined");

    const booksArrays = _sanitizeBooksArray(books);
    let mergedBooks = booksArrays;
    //TODO: implement actually merging 😅

    return mergedBooks;
};

/**
 * searches for the first array in object and validates the objects structure.
 * @param {*} booksObj
 */
const _sanitizeBooksArray = (booksObj) => {
    let arrayToValidate;

    if (Array.isArray(booksObj)) arrayToValidate = booksObj;
    else if (Array.isArray(Object.values(booksObj)[0])) {
        arrayToValidate = Object.values(booksObj)[0];
    } else throw new Error("Books array was not found!");

    //TODO: add structure validation

    arrayToValidate = [].concat(...arrayToValidate);
    return arrayToValidate;
};

module.exports = mergeBooks;
