import { Model, DataTypes } from "sequelize";
import { Database } from "../database/connection";

interface Cart {
  ID?: number;
  PID?: string;
  UserID?: string;
  Status?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}

class Carts extends Model<Cart> {}

try {
  Carts.init(
    {
      ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: "carts_id" },
      PID: { type: DataTypes.STRING(50), allowNull: false, unique: true, field: "carts_pid" },
      UserID: { type: DataTypes.STRING(50), allowNull: false, field: "user_id" },
      Status: { type: DataTypes.STRING(50), allowNull: false, defaultValue: "active", field: "carts_status"  },
      CreatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "created_at" },
      UpdatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "updated_at" },
    },
    { sequelize: Database.getInstance().getSequelize(), modelName: "Cart", tableName: "cart", timestamps: false },
  );
} catch (error) {
  console.error("Error initializing model [Carts]:", error);
}

export { Cart, Carts };
