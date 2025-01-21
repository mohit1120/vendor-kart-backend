"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestResponseLogs = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
class RequestResponseLogs extends sequelize_1.Model {
}
exports.RequestResponseLogs = RequestResponseLogs;
try {
    RequestResponseLogs.init({
        // Define model attributes
        ID: { type: sequelize_1.DataTypes.BIGINT, autoIncrement: true, primaryKey: true, field: "request_response_logs_id" },
        PID: { type: sequelize_1.DataTypes.STRING(40), allowNull: false, unique: true, field: "request_response_logs_pid" },
        TraceID: { type: sequelize_1.DataTypes.STRING(40), allowNull: false, field: "trace_id" },
        LogType: { type: sequelize_1.DataTypes.STRING, defaultValue: "general", field: "log_type" },
        Method: { type: sequelize_1.DataTypes.STRING(10), allowNull: true, field: "method" },
        ResponseCode: { type: sequelize_1.DataTypes.INTEGER, allowNull: true, field: "response_code" },
        RequestBodyLength: { type: sequelize_1.DataTypes.BIGINT, allowNull: true, field: "request_body_length" },
        ResponseBodyLength: { type: sequelize_1.DataTypes.BIGINT, allowNull: true, field: "response_body_length" },
        RequestBody: { type: sequelize_1.DataTypes.JSON, allowNull: true, field: "request_body" },
        ResponseBody: { type: sequelize_1.DataTypes.JSON, allowNull: true, field: "response_body" },
        EndPoint: { type: sequelize_1.DataTypes.STRING, allowNull: true, field: "endpoint" },
        HostURL: { type: sequelize_1.DataTypes.STRING, allowNull: true, field: "host_url" },
        ClientIP: { type: sequelize_1.DataTypes.STRING, allowNull: true, field: "client_ip" },
        RemoteIP: { type: sequelize_1.DataTypes.STRING, allowNull: true, field: "remote_ip" },
        Params: { type: sequelize_1.DataTypes.STRING, allowNull: true, field: "params" },
        QueryParam: { type: sequelize_1.DataTypes.STRING, allowNull: true, field: "query_param" },
        ContentType: { type: sequelize_1.DataTypes.STRING, allowNull: true, field: "content_type" },
        IsSandbox: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: "is_sandbox" },
        CreatedAt: { type: sequelize_1.DataTypes.DATE, field: "created_at", allowNull: false, defaultValue: sequelize_1.DataTypes.NOW },
        UpdatedAt: { type: sequelize_1.DataTypes.DATE, field: "updated_at", allowNull: false, defaultValue: sequelize_1.DataTypes.NOW },
    }, {
        sequelize: connection_1.Database.getInstance().getSequelize(),
        modelName: "RequestResponseLog",
        tableName: "request_response_logs",
        timestamps: false, // by defauly sequalize use created and updated. This is to disable that behaviour
    });
}
catch (error) {
    console.error("Error initializing model [RequestResponseLogs]:", error);
}
