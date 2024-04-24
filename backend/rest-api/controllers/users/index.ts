import { Request, Response, NextFunction } from "express";
import { globalState } from "../..";
import { userCreateSchema } from "./usersSchema";
import { generateId } from "../../lib/utils";
import { v4 as uuid } from "uuid";
import { CkbtcMinter } from "../../ckbtc";
import { Principal } from "azle";

class UserController {
  static async createUser(req: Request, res: Response, next: NextFunction) {
    const data = userCreateSchema.parse(req.body);

    const userPrincipal = generateId();

    const ckbtcMinter = new CkbtcMinter(
      Principal.fromText(process.env.CKBTC_MINTER_CANISTER_ID!)
    );

    const address = await ckbtcMinter.getAddress(userPrincipal);

    const userToCreate = {
      id: uuid(),
      name: data.name,
      email: data.email,
      password: data.password,
      principal: userPrincipal.toText(),
      address,
    };

    globalState.users.push(userToCreate);

    res.json({ success: true });
  }
}

export default UserController;
