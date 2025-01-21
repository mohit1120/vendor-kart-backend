"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartLineItems = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
class CartLineItems extends sequelize_1.Model {
}
exports.CartLineItems = CartLineItems;
try {
    CartLineItems.init({
        ID: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: "cart_items_id" },
        PID: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, unique: true, field: "cart_items_pid" },
        UserID: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, field: "user_id" },
        CartID: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, field: "cart_id" },
        ProductID: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, field: "product_id" },
        PaymentStatus: { type: sequelize_1.DataTypes.STRING(20), allowNull: true, field: "payment_status" },
        Quantity: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, field: "quantity" },
        Price: { type: sequelize_1.DataTypes.DECIMAL(10, 2), allowNull: false, field: "price" },
        CreatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW, field: "created_at" },
        UpdatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW, field: "updated_at" },
    }, { sequelize: connection_1.Database.getInstance().getSequelize(), modelName: "CartLineItem", tableName: "cart_line_items", timestamps: false });
}
catch (error) {
    console.error("Error initializing model [CartLineItems]:", error);
}
