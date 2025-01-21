import { Context } from "koa";
/* -------------------------------------------------------------------------- */
/*                                SLACK REQUEST                               */
/* -------------------------------------------------------------------------- */

interface SlackRequest {
  Ctx: Context;
  StatusCode: number;
  ErrorType: string;
  Message: string;
}
export { SlackRequest };
