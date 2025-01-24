import { Model, DataTypes } from "sequelize";
import { Database } from "../database/connection";

interface Product {
  ID?: number;
  PID?: string;
  CategoryID?: string;
  Name?: string;
  Description?: string;
  Price?: number;
  Qty?: number;
  VendorID?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}

class Products extends Model<Product> {}

try {
  Products.init(
    {
      ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: "products_id" },
      PID: { type: DataTypes.STRING(50), allowNull: false, unique: true, field: "products_pid" },
      CategoryID: { type: DataTypes.STRING(50), allowNull: false, field: "category_id" },
      Name: { type: DataTypes.STRING(100), allowNull: false, field: "name" },
      Description: { type: DataTypes.STRING(255), allowNull: true, field: "description" },
      Price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, field: "price" },
      Qty: { type: DataTypes.INTEGER, allowNull: false, field: "qty" },
      VendorID: { type: DataTypes.STRING(50), allowNull: false, field: "vendor_id" },
      CreatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "created_at" },
      UpdatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "updated_at" },
    },
    { sequelize: Database.getInstance().getSequelize(), modelName: "Product", tableName: "products", timestamps: false },
  );
} catch (error) {
  console.error("Error initializing model [Products]:", error);
}

export { Product, Products };
