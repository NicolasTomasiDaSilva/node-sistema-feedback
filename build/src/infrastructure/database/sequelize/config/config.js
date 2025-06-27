"use strict";
require("dotenv/config");
const config = {
    database: process.env.DB_NAME || "sistema-feedback-db",
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    dialect: "postgres",
    logging: false,
};
module.exports = config;
