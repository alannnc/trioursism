import { Request, Response, NextFunction } from "express";
import { globalState } from "../..";
import { userSchema } from "./usersSchema";

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const data = userSchema.parse(req.body);
  globalState.users.push(data);

  res.json({ success: true });
};

module.exports = { createUser };
