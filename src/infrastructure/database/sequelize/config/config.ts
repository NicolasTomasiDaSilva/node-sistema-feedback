import { Dialect, Options } from "sequelize";

export const config: Options = {
  dialect: process.env.DB_DIALECT as Dialect,
  host: process.env.DB_HOST as string,
  username: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  port: Number(process.env.DB_PORT) as number,
};
