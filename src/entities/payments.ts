import { Model, DataTypes } from "sequelize";
import { Database } from "../database/connection";

interface Payment {
  ID?: number;
  PID?: string;
  Amount?: string;
  OrderID?: string;
  Status?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}

class Payments extends Model<Payment> {}

try {
  Payments.init(
    {
      ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: "payments_id" },
      PID: { type: DataTypes.STRING(50), allowNull: false, unique: true, field: "payments_pid" },
      Amount: { type: DataTypes.STRING(50), allowNull: false, field: "amount" },
      OrderID: { type: DataTypes.STRING(50), allowNull: false, field: "order_id" },
      Status: { type: DataTypes.STRING(20), allowNull: false, field: "status" },
      CreatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "created_at" },
      UpdatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "updated_at" },
    },
    { sequelize: Database.getInstance().getSequelize(), modelName: "Payment", tableName: "payments", timestamps: false },
  );
} catch (error) {
  console.error("Error initializing model [Payments]:", error);
}

export { Payment, Payments };
