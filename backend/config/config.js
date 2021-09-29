const convict = require("convict");
const convict_format_with_validator = require("convict-format-with-validator");

convict.addFormats(convict_format_with_validator);

const config = convict({
    env: {
        doc: "The application environment.",
        format: ["production", "development", "test"],
        default: "development",
        env: "NODE_ENV",
    },
    ip: {
        doc: "The IP address to bind.",
        format: "ipaddress",
        default: "127.0.0.1",
        env: "IP_ADDRESS",
    },
    port: {
        doc: "The port to bind.",
        format: "port",
        default: 3001,
        env: "PORT",
        arg: "port",
    },
});

config.validate();

module.exports = config;
