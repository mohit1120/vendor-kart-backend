"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
// connection.ts
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
const errors_1 = require("../errors/errors");
class Database {
    constructor() {
        this.sequelizeOptions = {};
        // for local env
        this.sequelizeOptions = {
            database: config_1.config.database.dbName,
            username: config_1.config.database.dbUsername,
            password: config_1.config.database.dbPassword,
            host: config_1.config.database.dbHost,
            dialect: "postgres",
            logging: false,
        };
        if (config_1.config.app.env != "local") {
            this.sequelizeOptions = {
                database: config_1.config.database.dbName,
                username: config_1.config.database.dbUsername,
                password: config_1.config.database.dbPassword,
                host: config_1.config.database.dbHost,
                dialect: "postgres",
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false,
                    },
                },
                logging: false,
                // Add other Sequelize options as needed
            };
        }
        this.sequelize = new sequelize_1.Sequelize(this.sequelizeOptions);
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    getSequelize() {
        return this.sequelize;
    }
    closeSequilize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sequelize.close();
            }
            catch (error) {
                throw new errors_1.ServerError("[Sequelize][CloseSequelize]: " + error);
            }
        });
    }
}
exports.Database = Database;
