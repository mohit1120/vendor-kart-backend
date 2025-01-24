import { DataTypes, INTEGER, Model } from "sequelize";
import { Database } from "../database/connection";

// Interface representing attributes of the RequestResponseLogs model

interface RequestResponseLog {
  ID?: number | null;
  PID?: string | null;
  TraceID?: string | null;
  OrgPID?: string | null;
  OrgAccountsPID?: string | null;
  LogType?: string | null;
  Method?: string | null;
  ResponseCode?: number | null;
  RequestBodyLength?: number | null;
  ResponseBodyLength?: number | null;
  RequestBody?: object | null;
  ResponseBody?: object | null;
  EndPoint?: string | null;
  HostURL?: string | null;
  ClientIP?: string | null;
  RemoteIP?: string | null;
  Params?: string | null;
  QueryParam?: string | null;
  ContentType?: string | null;
  IsSandbox?: boolean | null;
  CreatedAt?: Date | null;
  UpdatedAt?: Date | null;
}
class RequestResponseLogs extends Model<RequestResponseLog> {}
try {
  RequestResponseLogs.init(
    {
      // Define model attributes
      ID: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true, field: "request_response_logs_id" },
      PID: { type: DataTypes.STRING(40), allowNull: false, unique: true, field: "request_response_logs_pid" },
      TraceID: { type: DataTypes.STRING(40), allowNull: false, field: "trace_id" },
      LogType: { type: DataTypes.STRING, defaultValue: "general", field: "log_type" },
      Method: { type: DataTypes.STRING(10), allowNull: true, field: "method" },
      ResponseCode: { type: DataTypes.INTEGER, allowNull: true, field: "response_code" },
      RequestBodyLength: { type: DataTypes.BIGINT, allowNull: true, field: "request_body_length" },
      ResponseBodyLength: { type: DataTypes.BIGINT, allowNull: true, field: "response_body_length" },
      RequestBody: { type: DataTypes.JSON, allowNull: true, field: "request_body" },
      ResponseBody: { type: DataTypes.JSON, allowNull: true, field: "response_body" },
      EndPoint: { type: DataTypes.STRING, allowNull: true, field: "endpoint" },
      HostURL: { type: DataTypes.STRING, allowNull: true, field: "host_url" },
      ClientIP: { type: DataTypes.STRING, allowNull: true, field: "client_ip" },
      RemoteIP: { type: DataTypes.STRING, allowNull: true, field: "remote_ip" },
      Params: { type: DataTypes.STRING, allowNull: true, field: "params" },
      QueryParam: { type: DataTypes.STRING, allowNull: true, field: "query_param" },
      ContentType: { type: DataTypes.STRING, allowNull: true, field: "content_type" },
      IsSandbox: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: "is_sandbox" },
      CreatedAt: { type: DataTypes.DATE, field: "created_at", allowNull: false, defaultValue: DataTypes.NOW },
      UpdatedAt: { type: DataTypes.DATE, field: "updated_at", allowNull: false, defaultValue: DataTypes.NOW },
    },
    {
      sequelize: Database.getInstance().getSequelize(),
      modelName: "RequestResponseLog",
      tableName: "request_response_logs",
      timestamps: false, // by defauly sequalize use created and updated. This is to disable that behaviour
    },
  );
} catch (error) {
  console.error("Error initializing model [RequestResponseLogs]:", error);
}

export { RequestResponseLog, RequestResponseLogs };
