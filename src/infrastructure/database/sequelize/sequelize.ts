// src/infrastructure/sequelize.ts
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
    const sequelize = Database.getInstance();

    await sequelize.authenticate();
    console.log("Connected to database");

    const [
      { CompanyModel },
      { UserModel },
      { InvitationModel },
      { ChecklistModel },
      { ChecklistItemModel },
      { FeedbackModel },
      { FeedbackItemModel },
    ] = await Promise.all([
      import("./models/company"),
      import("./models/user"),
      import("./models/invitation"),
      import("./models/checklist"),
      import("./models/checklist-item"),
      import("./models/feedback"),
      import("./models/feedback-item"),
    ]);

    CompanyModel.initModel(sequelize);
    UserModel.initModel(sequelize);
    InvitationModel.initModel(sequelize);
    FeedbackModel.initModel(sequelize);
    FeedbackItemModel.initModel(sequelize);
    ChecklistModel.initModel(sequelize);
    ChecklistItemModel.initModel(sequelize);

    CompanyModel.associate();
    UserModel.associate();
    InvitationModel.associate();
    ChecklistModel.associate();
    ChecklistItemModel.associate();
    FeedbackModel.associate();
    FeedbackItemModel.associate();

    await sequelize.sync({
      alter: true,
    });
    console.log("All models were synchronized successfully.");
  }

  public static async disconnect(): Promise<void> {
    await Database._instance?.close();
    console.log("Disconnected from database");
  }
}
