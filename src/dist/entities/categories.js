"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categories = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
class Categories extends sequelize_1.Model {
}
exports.Categories = Categories;
try {
    Categories.init({
        ID: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: "categories_id" },
        PID: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, unique: true, field: "categories_pid" },
        Name: { type: sequelize_1.DataTypes.STRING(100), allowNull: false, field: "name" },
        Description: { type: sequelize_1.DataTypes.STRING(255), allowNull: true, field: "description" },
        CreatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW, field: "created_at" },
        UpdatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW, field: "updated_at" },
    }, { sequelize: connection_1.Database.getInstance().getSequelize(), modelName: "Category", tableName: "categories", timestamps: false });
}
catch (error) {
    console.error("Error initializing model [Categories]:", error);
}
