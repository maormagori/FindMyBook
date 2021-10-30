const workers = require("./workers");
const axios = require("axios");

const getResultFromMultipleWorkers = async (text, stores) => {
    const filteredWorkers = getWorkers(stores);

    const workersResults = await Promise.allSettled(
        filteredWorkers.map((worker) => getSearchResultFromWorker(worker))
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

//TODO: Change name to something that more reflects what the function is doing.
const getWorkers = (storesArray) => {
    return workers.get("workers").filter((worker) => {
        if (worker.active && storesArray.includes(worker.store.id))
            return active;
    });
};

module.exports = {
    getResultFromMultipleWorkers,
    getResultFromWorker: getSearchResultFromWorker,
    getWorkers,
};
