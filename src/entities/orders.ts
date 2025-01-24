import { Model, DataTypes } from "sequelize";
import { Database } from "../database/connection";

interface Order {
  ID?: number;
  PID?: string;
  UserID?: string;
  TotalAmount?: number;
  Status?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}

class Orders extends Model<Order> {}

try {
  Orders.init(
    {
      ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: "orders_id" },
      PID: { type: DataTypes.STRING(50), allowNull: false, unique: true, field: "orders_pid" },
      UserID: { type: DataTypes.STRING(50), allowNull: false, field: "user_id" },
      TotalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false, field: "total_amount" },
      Status: {type: DataTypes.STRING, allowNull: false, defaultValue: "Pending", field: "status"},
      CreatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "created_at" },
      UpdatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "updated_at" },
    },
    { sequelize: Database.getInstance().getSequelize(), modelName: "Order", tableName: "orders", timestamps: false },
  );
} catch (error) {
  console.error("Error initializing model [Orders]:", error);
}

export { Order, Orders };
