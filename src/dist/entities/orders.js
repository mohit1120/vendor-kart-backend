"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
class Orders extends sequelize_1.Model {
}
exports.Orders = Orders;
try {
    Orders.init({
        ID: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: "orders_id" },
        PID: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, unique: true, field: "orders_pid" },
        UserID: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, field: "user_id" },
        TotalAmount: { type: sequelize_1.DataTypes.DECIMAL(10, 2), allowNull: false, field: "total_amount" },
        CreatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW, field: "created_at" },
        UpdatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW, field: "updated_at" },
    }, { sequelize: connection_1.Database.getInstance().getSequelize(), modelName: "Order", tableName: "orders", timestamps: false });
}
catch (error) {
    console.error("Error initializing model [Orders]:", error);
}
