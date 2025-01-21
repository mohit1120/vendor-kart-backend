"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carts = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
class Carts extends sequelize_1.Model {
}
exports.Carts = Carts;
try {
    Carts.init({
        ID: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: "carts_id" },
        PID: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, unique: true, field: "carts_pid" },
        UserID: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, field: "user_id" },
        Status: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, defaultValue: "active", field: "carts_status" },
        CreatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW, field: "created_at" },
        UpdatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW, field: "updated_at" },
    }, { sequelize: connection_1.Database.getInstance().getSequelize(), modelName: "Cart", tableName: "cart", timestamps: false });
}
catch (error) {
    console.error("Error initializing model [Carts]:", error);
}
