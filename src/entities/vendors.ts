import { Model, DataTypes } from "sequelize";
import { Database } from "../database/connection";

interface Vendor {
  ID?: number;
  PID?: string;
  Name?: string;
  Email?: string;
  Mobile?: string;
  LegalEntityName?: string;
  BusinessName?: string;
  GSTNo?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}

class Vendors extends Model<Vendor> {}

try {
  Vendors.init(
    {
      ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: "vendors_id" },
      PID: { type: DataTypes.STRING(50), allowNull: false, unique: true, field: "vendors_pid" },
      Name: { type: DataTypes.STRING(100), allowNull: false, field: "name" },
      Email: { type: DataTypes.STRING(100), allowNull: true, field: "email" },
      Mobile: { type: DataTypes.STRING(20), allowNull: true, field: "mobile" },
      LegalEntityName: { type: DataTypes.STRING(100), allowNull: true, field: "legal_entity_name" },
      BusinessName: { type: DataTypes.STRING(100), allowNull: true, field: "business_name" },
      GSTNo: { type: DataTypes.STRING(50), allowNull: true, field: "gst_no" },
      CreatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "created_at" },
      UpdatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "updated_at" },
    },
    { sequelize: Database.getInstance().getSequelize(), modelName: "Vendor", tableName: "vendors", timestamps: false },
  );
} catch (error) {
  console.error("Error initializing model [Vendors]:", error);
}

export { Vendor, Vendors };
