const workers = require("./workers");
const axios = require("axios");

const getResultFromMultipleWorkers = async (text, stores) => {
    const filteredWorkers = getWorkers(stores);

    const workersResults = await Promise.allSettled(
        filteredWorkers.map((worker) => getSearchResultFromWorker(worker))
    );

    //TODO: add results logging.

    return workersResults;
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
        return workerResponse.data;
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
