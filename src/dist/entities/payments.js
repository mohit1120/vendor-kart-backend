"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payments = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
class Payments extends sequelize_1.Model {
}
exports.Payments = Payments;
try {
    Payments.init({
        ID: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: "payments_id" },
        PID: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, unique: true, field: "payments_pid" },
        Amount: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, field: "amount" },
        OrderID: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, field: "order_id" },
        Status: { type: sequelize_1.DataTypes.STRING(20), allowNull: false, field: "status" },
        CreatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW, field: "created_at" },
        UpdatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW, field: "updated_at" },
    }, { sequelize: connection_1.Database.getInstance().getSequelize(), modelName: "Payment", tableName: "payments", timestamps: false });
}
catch (error) {
    console.error("Error initializing model [Payments]:", error);
}
