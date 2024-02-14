import { Request, Response } from "express";
import { businessSchema } from "./businessSchema";
import { globalState } from "../..";

class BusinessController {
  static create(req: Request, res: Response) {
    const data = businessSchema.parse(req.body);
    globalState.business.push(data);

    res.json({ success: true });
  }
}

export default BusinessController;
