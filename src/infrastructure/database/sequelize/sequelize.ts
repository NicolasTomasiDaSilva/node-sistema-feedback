import { Sequelize } from "sequelize";
import * as config from "./config/config";
export class Database {
  private static _instance: Sequelize;

  private constructor() {}

  public static getInstance(): Sequelize {
    if (!Database._instance) {
      Database._instance = new Sequelize(config);
    }
    return Database._instance;
  }

  public static async connect(): Promise<void> {
    await Database.getInstance().authenticate();
    console.log("Connected to database");
  }

  public static async disconnect(): Promise<void> {
    await Database._instance?.close();
    console.log("Disconnected from database");
  }
}
