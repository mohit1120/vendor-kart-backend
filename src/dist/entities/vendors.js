"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vendors = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
class Vendors extends sequelize_1.Model {
}
exports.Vendors = Vendors;
try {
    Vendors.init({
        ID: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: "vendors_id" },
        PID: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, unique: true, field: "vendors_pid" },
        Name: { type: sequelize_1.DataTypes.STRING(100), allowNull: false, field: "name" },
        Email: { type: sequelize_1.DataTypes.STRING(100), allowNull: true, field: "email" },
        Mobile: { type: sequelize_1.DataTypes.STRING(20), allowNull: true, field: "mobile" },
        LegalEntityName: { type: sequelize_1.DataTypes.STRING(100), allowNull: true, field: "legal_entity_name" },
        BusinessName: { type: sequelize_1.DataTypes.STRING(100), allowNull: true, field: "business_name" },
        GSTNo: { type: sequelize_1.DataTypes.STRING(50), allowNull: true, field: "gst_no" },
        CreatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW, field: "created_at" },
        UpdatedAt: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW, field: "updated_at" },
    }, { sequelize: connection_1.Database.getInstance().getSequelize(), modelName: "Vendor", tableName: "vendors", timestamps: false });
}
catch (error) {
    console.error("Error initializing model [Vendors]:", error);
}
