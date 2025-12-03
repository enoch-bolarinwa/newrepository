const pgp = require("pg-promise")();
rerequire("dotenv").config();quire
const database = pgp(process.env.DATABASE_URL); // or your local connection string
// db/connection.js
require("dotenv").config();

const connectionString = process.env.DATABASE_URL || "postgresql://enoch341:iZQuFM3RYSKOYAJGm8ShRAl4vWArRcDN@dpg-d49163chg0os738ic7pg-a.oregon-postgres.render.com/enoch341";

const db = pgp(connectionString);

module.exports = db;

module.exports = database;
