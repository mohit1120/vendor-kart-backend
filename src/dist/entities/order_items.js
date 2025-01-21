"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItems = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
class OrderItems extends sequelize_1.Model {
}
exports.OrderItems = OrderItems;
try {
    OrderItems.init({
        ID: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: "order_items_id" },
        PID: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, unique: true, field: "order_items_pid" },
        OrderID: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, field: "order_id" },
        ProductID: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, field: "product_id" },
        Price: { type: sequelize_1.DataTypes.DECIMAL(10, 2), allowNull: false, field: "price" },
        Quantity: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, field: "qty" },
        UserID: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, field: "user_id" },
        VendorID: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, field: "vendor_id" },
        CreatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW, field: "created_at" },
        UpdatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW, field: "updated_at" },
    }, { sequelize: connection_1.Database.getInstance().getSequelize(), modelName: "OrderItem", tableName: "order_items", timestamps: false });
}
catch (error) {
    console.error("Error initializing model [OrderItems]:", error);
}
