import { utils } from "../utils/utils";
import { ServerError } from "../errors/errors";
import { Context } from "koa";
import { RequestResponseLog, RequestResponseLogs } from "../entities/request_response_logs";

/* -------------------------------------------------------------------------- */
/*                                  INTERFACE                                 */
/* -------------------------------------------------------------------------- */
interface Interface {
  CreateLog(ctx: Context, logData: RequestResponseLog): Promise<RequestResponseLog>;
}

/* -------------------------------------------------------------------------- */
/*                                    CLASS                                   */
/* -------------------------------------------------------------------------- */

class LogsDBImpl implements Interface {
  /* ---------------------------- CREATE LOG ENTRY ---------------------------- */

  async CreateLog(ctx: Context, logData: RequestResponseLog): Promise<RequestResponseLog> {
    try {
      logData.PID = utils.GeneratePrefixedUUID("log");
      const log = await RequestResponseLogs.create(logData);

      // Convert Sequelize instance to plain object and cast to Org interface
      const createdLog: RequestResponseLog = log.toJSON() as RequestResponseLog;

      return createdLog;
    } catch (error) {
      throw new ServerError("[createLog][LogsDBImpl]: " + error);
    }
  }
}

export { LogsDBImpl };
