const env = require("../config/config").get("env");

const convict = require("convict");
const convict_format_with_validator = require("convict-format-with-validator");

convict.addFormats(convict_format_with_validator);

convict.addFormat({
    name: "workers-array",
    validate: (workers, scheme) => {
        if (!Array.isArray(workers)) {
            throw new Error("must be of type Array");
        }

        let ids = {};
        for (worker of workers) {
            if (ids[worker.store.id] === true)
                throw new Error("Found duplicate workers");
            else ids[worker.store.id] = true;

            convict(scheme.children).load(worker).validate();
        }
    },
});

const workersScheme = {
    workers: {
        doc: "Collection of store scrapers",
        format: "workers-array",
        default: [],

        children: {
            name: {
                doc: "worker's name",
                format: String,
                default: "",
            },
            ip: {
                doc: "The worker ip",
                format: "ipaddress",
                default: "127.0.0.1",
            },

            port: {
                doc: "The port to the worker.",
                format: "port",
                default: "",
            },
            active: {
                format: "Boolean",
                default: true,
            },
            url: {
                doc: "worker address",
                format: "url",
                default: "",
            },
            store: {
                id: {
                    doc: "The bookstore's id",
                    format: String,
                    default: "",
                },
                name: {
                    doc: "The bookstore name",
                    format: String,
                    default: "",
                },
                base_url: {
                    format: "url",
                    default: "",
                },
            },
        },
    },
};

const workers = convict(workersScheme);
if (env === "development")
    workers.loadFile(__dirname + "/development_workers.json");
else workers.loadFile(__dirname + "/workers.json");

workers.validate();

module.exports = workers;
