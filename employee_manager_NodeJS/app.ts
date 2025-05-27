import express from "express";
import employeeRouter from "./routes/employee.route";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import dataSource from "./db/data-source";
import processTimeMiddleware from "./middlewares/processTimeMiddleware";
import errorMiddleware from "./middlewares/errorMiddleware";
import authRouter from "./routes/auth.routes";
import authMiddleware from "./middlewares/authMiddleware";
import { LoggerService } from "./services/logger.service";
import departmentRouter from "./routes/department.routes";

const { Client } = require("pg");

const server = express();
const logger = LoggerService.getInstance("app()");

server.use(express.json());
server.use(loggerMiddleware);
server.use(processTimeMiddleware);

server.use("/auth", authRouter);
server.use("/department", departmentRouter);
server.use("/employee", authMiddleware, employeeRouter);

server.use(errorMiddleware);

server.get("/", (req, res) => {
    console.log(req.url);
    res.status(200).send("Hello world typescript");
});

(async () => {
    try {
        await dataSource.initialize();
        logger.info("connected");

        server.listen(3000, () => {
            logger.info("server listening to 3000");
        });
    } catch (e) {
        logger.error(`Failed to connect to DB:  ${e}`);
        process.exit(1);
    }
})();

/* // Database connection configuration
const dbConfig = {
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: '5432',
  database: 'training',
};

const client = new Client(dbConfig);

client.connect()
  .then(() => {
    client.query('SELECT * FROM employee', (err, result) => {
      if (!err) {
        console.log('Query result:', result.rows);
      }
      client.end();
    });
  })
  .catch((err) => {}); */
