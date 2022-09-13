import config from "../config";
import { configure, getLogger } from "log4js";
configure(config.logger);
export const dbLogger = getLogger("db");
export const accessLogger = getLogger("access");
export default getLogger;
