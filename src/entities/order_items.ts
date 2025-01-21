import { Model, DataTypes } from "sequelize";
import { Database } from "../database/connection";

interface OrderItem {
  ID?: number;
  PID?: string;
  OrderID?: string;
  ProductID?: string;
  Price?: number;
  Quantity?: number;
  UserID?: string;
  VendorID?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}

class OrderItems extends Model<OrderItem> {}

try {
  OrderItems.init(
    {
      ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: "order_items_id" },
      PID: { type: DataTypes.STRING(50), allowNull: false, unique: true, field: "order_items_pid" },
      OrderID: { type: DataTypes.STRING(50), allowNull: false, field: "order_id" },
      ProductID: { type: DataTypes.STRING(50), allowNull: false, field: "product_id" },
      Price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, field: "price" },
      Quantity: { type: DataTypes.INTEGER, allowNull: false, field: "qty" },
      UserID: { type: DataTypes.STRING(50), allowNull: false, field: "user_id" },
      VendorID: { type: DataTypes.STRING(50), allowNull: false, field: "vendor_id" },
      CreatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "created_at" },
      UpdatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "updated_at" },
    },
    { sequelize: Database.getInstance().getSequelize(), modelName: "OrderItem", tableName: "order_items", timestamps: false },
  );
} catch (error) {
  console.error("Error initializing model [OrderItems]:", error);
}

export { OrderItem, OrderItems };
