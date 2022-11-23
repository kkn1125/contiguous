import path from "path";
import dotenv from "dotenv";

const __dirname = path.resolve();
const mode = process.env.NODE_ENV;
dotenv.config({
  path: path.join(__dirname, `.env.${mode}`),
});

// mariadb informations
const { DB_PORT, DB_HOST, DB_USERNAME, DB_PW, DB_DATABASE } = process.env;

export default {
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USERNAME,
  password: String(DB_PW),
  database: DB_DATABASE || "",
};
