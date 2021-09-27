const { getResultFromMultipleWorkers } = require("../workers/employer");
const booksMerger = require("books-merger");

/**
 * Searches the given stores for the book and merges the results.
 * @param {Object} searchObject The text to search
 * @returns An object containing an array of books
 */
const search = async (searchObject) => {
  let results = { requestStores: searchObject.stores };

  if (!_validateSearchObject(searchObject))
    return { error: "Invalid search query" };

  const workersResults = await getResultFromMultipleWorkers(
    searchObject.text,
    searchObject.stores
  );
  const successfulStores = workersResults.successfulWorkers;

  results[successfulStores] = successfulStores;
  const booksAfterMerge = booksMerger(workersResults);

  results[books] = booksAfterMerge;

  return { results: results };
};

/**
 * Validates search query.
 * @param {Object} searchObject The text to search
 * @returns True if valid false otherwise
 */
const _validateSearchObject = (searchObject) => {
  if (!searchObject.text) {
    return false;
  }

  if (Array.isArray(searchObject.stores)) {
    return false;
  }
};
