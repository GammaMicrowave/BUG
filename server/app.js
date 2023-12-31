import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.js";
import PrismaInit from "./config/sql.config.js";
import cookieParser from "cookie-parser";
import { socketInit } from "./config/socket.config.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    parameterLimit: 100000,
    extended: false,
  })
);
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api", routes);

PrismaInit()
  .then(() => {
    const server = app.listen(
      process.env.PORT ? process.env.PORT : 8080,
      process.env.HOST ? process.env.HOST : "127.0.0.1",
      console.log(
        `listening on http://localhost:${
          process.env.PORT ? process.env.PORT : 8080
        }/`
      )
    );

    socketInit(server);
  })
  .catch((err) => {
    console.log(err);
  });
