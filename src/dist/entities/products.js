"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
class Products extends sequelize_1.Model {
}
exports.Products = Products;
try {
    Products.init({
        ID: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: "products_id" },
        PID: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, unique: true, field: "products_pid" },
        CategoryID: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, field: "category_id" },
        Name: { type: sequelize_1.DataTypes.STRING(100), allowNull: false, field: "name" },
        Description: { type: sequelize_1.DataTypes.STRING(255), allowNull: true, field: "description" },
        Price: { type: sequelize_1.DataTypes.DECIMAL(10, 2), allowNull: false, field: "price" },
        Qty: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, field: "qty" },
        VendorID: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, field: "vendor_id" },
        CreatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW, field: "created_at" },
        UpdatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW, field: "updated_at" },
    }, { sequelize: connection_1.Database.getInstance().getSequelize(), modelName: "Product", tableName: "products", timestamps: false });
}
catch (error) {
    console.error("Error initializing model [Products]:", error);
}
