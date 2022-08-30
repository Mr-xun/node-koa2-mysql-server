const config = require("../config");
const { configure, getLogger } = require("log4js");
configure(config.logger);
module.exports = getLogger;
