"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shipments = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
// Sequelize Model for Shipments
class Shipments extends sequelize_1.Model {
}
exports.Shipments = Shipments;
try {
    // Initialize the Shipments model with the corresponding schema
    Shipments.init({
        shipment_id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: "shipments_id"
        },
        shipment_pid: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            field: "shipments_pid"
        },
        order_id: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false,
            field: "order_id"
        },
        order_item_id: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false,
            field: "order_item_id"
        },
        status: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false,
            field: "status"
        },
        tracking_number: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
            field: "tracking_number"
        },
        created_at: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
            field: "created_at"
        },
        updated_at: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
            field: "updated_at"
        },
        is_deleted: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
            field: "is_deleted"
        }
    }, {
        sequelize: connection_1.Database.getInstance().getSequelize(),
        modelName: "Shipments",
        tableName: "shipments",
        timestamps: false
    });
}
catch (error) {
    console.error("Error initializing model [Shipments]:", error);
}
