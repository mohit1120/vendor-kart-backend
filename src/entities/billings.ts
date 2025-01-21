import { Model, DataTypes } from "sequelize";
import { Database } from "../database/connection";

interface Billing {
  ID?: number;
  PID?: string;
  Amount?: string;
  ShipmentID?: string;
  Status?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}

class Billings extends Model<Billing> {}

try {
  Billings.init(
    {
      ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: "billings_id" },
      PID: { type: DataTypes.STRING(50), allowNull: false, unique: true, field: "billings_pid" },
      Amount: { type: DataTypes.STRING(50), allowNull: false, field: "amount" },
      ShipmentID: { type: DataTypes.STRING(50), allowNull: false, field: "shipment_id" },
      Status: { type: DataTypes.STRING(20), allowNull: false, field: "status" },
      CreatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "created_at" },
      UpdatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "updated_at" },
    },
    { sequelize: Database.getInstance().getSequelize(), modelName: "Billing", tableName: "billings", timestamps: false },
  );
} catch (error) {
  console.error("Error initializing model [Billings]:", error);
}

export { Billing, Billings };
