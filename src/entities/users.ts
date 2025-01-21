import { Model, DataTypes } from "sequelize";
import { Database } from "../database/connection";

interface User {
  ID?: number;
  PID?: string;
  Name?: string;
  Email?: string;
  Mobile?: string;
  ShippingAddress?: string;
  BillingAddress?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}

class Users extends Model<User> {}

try {
  Users.init(
    {
      ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: "users_id" },
      PID: { type: DataTypes.STRING(50), allowNull: false, unique: true, field: "users_pid" },
      Name: { type: DataTypes.STRING(50), allowNull: false, field: "users_name" },
      Email: { type: DataTypes.STRING(50), allowNull: false, field: "users_email" },
      Mobile: { type: DataTypes.STRING(50), allowNull: false, field: "users_mobile" },
      ShippingAddress: { type: DataTypes.STRING(255), allowNull: true, field: "shipping_address" },
      BillingAddress: { type: DataTypes.STRING(255), allowNull: true, field: "billing_address" },
      CreatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "created_at" },
      UpdatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "updated_at" },
    },
    { sequelize: Database.getInstance().getSequelize(), modelName: "User", tableName: "users", timestamps: false },
  );
} catch (error) {
  console.error("Error initializing model [Users]:", error);
}

export { User, Users };
