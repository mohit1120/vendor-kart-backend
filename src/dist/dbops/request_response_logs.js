"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsDBImpl = void 0;
const utils_1 = require("../utils/utils");
const errors_1 = require("../errors/errors");
const request_response_logs_1 = require("../entities/request_response_logs");
/* -------------------------------------------------------------------------- */
/*                                    CLASS                                   */
/* -------------------------------------------------------------------------- */
class LogsDBImpl {
    /* ---------------------------- CREATE LOG ENTRY ---------------------------- */
    CreateLog(ctx, logData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logData.PID = utils_1.utils.GeneratePrefixedUUID("log");
                const log = yield request_response_logs_1.RequestResponseLogs.create(logData);
                // Convert Sequelize instance to plain object and cast to Org interface
                const createdLog = log.toJSON();
                return createdLog;
            }
            catch (error) {
                throw new errors_1.ServerError("[createLog][LogsDBImpl]: " + error);
            }
        });
    }
}
exports.LogsDBImpl = LogsDBImpl;
