import { Model, DataTypes } from "sequelize";
import { Database } from "../database/connection";

interface Category {
  ID?: number;
  PID?: string;
  Name?: string;
  Description?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}

class Categories extends Model<Category> {}

try {
  Categories.init(
    {
      ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: "categories_id" },
      PID: { type: DataTypes.STRING(50), allowNull: false, unique: true, field: "categories_pid" },
      Name: { type: DataTypes.STRING(100), allowNull: false, field: "name" },
      Description: { type: DataTypes.STRING(255), allowNull: true, field: "description" },
      CreatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "created_at" },
      UpdatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "updated_at" },
    },
    { sequelize: Database.getInstance().getSequelize(), modelName: "Category", tableName: "categories", timestamps: false },
  );
} catch (error) {
  console.error("Error initializing model [Categories]:", error);
}

export { Category, Categories };
