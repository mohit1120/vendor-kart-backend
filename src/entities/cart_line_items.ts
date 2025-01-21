import { Model, DataTypes } from "sequelize";
import { Database } from "../database/connection";

interface CartLineItem {
  ID?: number;
  PID?: string;
  UserID?: string;
  CartID?: string;
  ProductID?: string;
  PaymentStatus?: string;
  Quantity?: number;
  Price?: number;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}

class CartLineItems extends Model<CartLineItem> {}

try {
  CartLineItems.init(
    {
      ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: "cart_items_id" },
      PID: { type: DataTypes.STRING(50), allowNull: false, unique: true, field: "cart_items_pid" },
      UserID: { type: DataTypes.STRING(50), allowNull: false, field: "user_id" },
      CartID: { type: DataTypes.STRING(50), allowNull: false, field: "cart_id" },
      ProductID: { type: DataTypes.STRING(50), allowNull: false, field: "product_id" },
      PaymentStatus: { type: DataTypes.STRING(20), allowNull: true, field: "payment_status" },
      Quantity: { type: DataTypes.INTEGER, allowNull: false, field: "quantity" },
      Price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, field: "price" },
      CreatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "created_at" },
      UpdatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "updated_at" },
    },
    { sequelize: Database.getInstance().getSequelize(), modelName: "CartLineItem", tableName: "cart_line_items", timestamps: false },
  );
} catch (error) {
  console.error("Error initializing model [CartLineItems]:", error);
}

export { CartLineItem, CartLineItems };
