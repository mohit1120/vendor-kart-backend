import { Model, DataTypes } from "sequelize";
import { Database } from "../database/connection";

// Interface for Shipment data
interface Shipment {
  ID?: number;
  PID?: string;
  OrderID?: string;
  OrderItemID?: string;
  Status?: string;
  TrackingNo?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}

// Sequelize Model for Shipments
class Shipments extends Model<Shipment> {}

try {
  // Initialize the Shipments model with the corresponding schema
  Shipments.init(
    {
      ID: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true, 
        field: "shipments_id" 
      },
      PID: { 
        type: DataTypes.STRING(50), 
        allowNull: false, 
        unique: true, 
        field: "shipments_pid" 
      },
      OrderID: { 
        type: DataTypes.STRING(50), 
        allowNull: false, 
        field: "order_id" 
      },
      OrderItemID: { 
        type: DataTypes.STRING(50), 
        allowNull: false, 
        field: "order_item_id" 
      },
      Status: { 
        type: DataTypes.STRING(50), 
        allowNull: false, 
        defaultValue: "Pending",
        field: "status" 
      },
      TrackingNo: { 
        type: DataTypes.STRING(100), 
        allowNull: false, 
        field: "tracking_number" 
      },
      CreatedAt: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: DataTypes.NOW, 
        field: "created_at" 
      },
      UpdatedAt: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: DataTypes.NOW, 
        field: "updated_at" 
      },
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
