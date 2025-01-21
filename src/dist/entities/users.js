"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
class Users extends sequelize_1.Model {
}
exports.Users = Users;
try {
    Users.init({
        ID: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: "users_id" },
        PID: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, unique: true, field: "users_pid" },
        Name: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, field: "users_name" },
        Email: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, field: "users_email" },
        Mobile: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, field: "users_mobile" },
        ShippingAddress: { type: sequelize_1.DataTypes.STRING(255), allowNull: true, field: "shipping_address" },
        BillingAddress: { type: sequelize_1.DataTypes.STRING(255), allowNull: true, field: "billing_address" },
        CreatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW, field: "created_at" },
        UpdatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW, field: "updated_at" },
    }, { sequelize: connection_1.Database.getInstance().getSequelize(), modelName: "User", tableName: "users", timestamps: false });
}
catch (error) {
    console.error("Error initializing model [Users]:", error);
}
