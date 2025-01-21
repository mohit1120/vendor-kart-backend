import { errorType } from "./errors";
import { headers } from "./headers";
import { http } from "./status_codes";
import { Prefix } from "./prefix";

const constants = {
  headers: headers,
  errorType: errorType,
  http: http,
  Prefix: Prefix,
};

export { constants };
