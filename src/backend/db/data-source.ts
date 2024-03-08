import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../db/entity/User";

export const AppDataSource = new DataSource({
  type: "sqljs",
  driver: "sqljs",
  logging: true,
  entities: [User],
  migrations: [],
  subscribers: [],
});
