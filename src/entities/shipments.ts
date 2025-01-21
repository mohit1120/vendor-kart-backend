import { Model, DataTypes } from "sequelize";
import { Database } from "../database/connection";

// Interface for Shipment data
interface Shipment {
  shipment_id?: number;
  shipment_pid: string;
  order_id: string;
  order_item_id: string;
  status: string;
  tracking_number: string;
  created_at?: Date;
  updated_at?: Date;
  is_deleted?: boolean;
}

// Sequelize Model for Shipments
class Shipments extends Model<Shipment> {}

try {
  // Initialize the Shipments model with the corresponding schema
  Shipments.init(
    {
      shipment_id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true, 
        field: "shipments_id" 
      },
      shipment_pid: { 
        type: DataTypes.STRING(50), 
        allowNull: false, 
        unique: true, 
        field: "shipments_pid" 
      },
      order_id: { 
        type: DataTypes.STRING(50), 
        allowNull: false, 
        field: "order_id" 
      },
      order_item_id: { 
        type: DataTypes.STRING(50), 
        allowNull: false, 
        field: "order_item_id" 
      },
      status: { 
        type: DataTypes.STRING(50), 
        allowNull: false, 
        field: "status" 
      },
      tracking_number: { 
        type: DataTypes.STRING(100), 
        allowNull: false, 
        field: "tracking_number" 
      },
      created_at: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: DataTypes.NOW, 
        field: "created_at" 
      },
      updated_at: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: DataTypes.NOW, 
        field: "updated_at" 
      },
      is_deleted: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false, 
        field: "is_deleted" 
      }
    },
    { 
      sequelize: Database.getInstance().getSequelize(), 
      modelName: "Shipments", 
      tableName: "shipments", 
      timestamps: false 
    },
  );
} catch (error) {
  console.error("Error initializing model [Shipments]:", error);
}

export { Shipment, Shipments };
