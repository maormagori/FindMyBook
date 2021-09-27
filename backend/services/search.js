const { getResultFromMultipleWorkers } = require("../workers/employer");
const booksMerger = require("books-merger");

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

const _validateSearchObject = (searchObject) => {
  if (!searchObject.text) {
    return false;
  }

  if (Array.isArray(searchObject.stores)) {
    return false;
  }
};
