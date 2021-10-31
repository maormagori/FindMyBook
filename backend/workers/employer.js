const workers = require("./workers");
const axios = require("axios");

const getResultFromMultipleWorkers = async (text, stores) => {
    const filteredWorkers = getRequestedWorkers(stores);

    const workersResults = await Promise.allSettled(
        filteredWorkers.map((worker) => getSearchResultFromWorker(worker, text))
    );

    const requestedWorkersResultsWithData = {
        successfulWorkers: [],
        returnedArrays: [],
    };

    workersResults.forEach((result) => {
        if (result.value.isSuccessful) {
            requestedWorkersResultsWithData.successfulWorkers.push(
                result.value.store
            );
            requestedWorkersResultsWithData.returnedArrays.push(
                result.value.data
            );
        }
    });
    //TODO: add results logging.

    return requestedWorkersResultsWithData;
};

const getSearchResultFromWorker = async (worker, text) => {
    let resultFromWorker = {
        worker: worker.name,
        store: worker.store.id,
    };
    try {
        let workerResponse = await axios.get(`${worker.url}/search`, {
            params: {
                text: text,
            },
        });
        resultFromWorker.isSuccessful = true;
        resultFromWorker.data = workerResponse.data;
        return resultFromWorker;
    } catch (error) {
        resultFromWorker.isSuccessful = false;
        resultFromWorker.error = error;
        return resultFromWorker;
    }
};

const getRequestedWorkers = (storesArray) => {
    return workers.get("workers").filter((worker) => {
        if (storesArray.includes(worker.store.id)) {
            return worker.active;
        }
    });
};

module.exports = {
    getResultFromMultipleWorkers,
    getResultFromWorker: getSearchResultFromWorker,
    getWorkers: getRequestedWorkers,
};
