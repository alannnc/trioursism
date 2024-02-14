import { Request, Response } from "express";
import { globalState } from "../..";
// import { CkbtcMinter } from "../../ckbtc";
import { v4 as uuid } from "uuid";
import { paymentCreateSchema } from "./paymentSchema";

class PaymentController {
  static async create(req: Request, res: Response) {
    const parse = paymentCreateSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: parse.error });
    }

    const { bookingUid, amount } = parse.data;
    const payment = {
      bookingUid,
      amount,
      id: uuid(),
      status: "pending",
    };
    globalState.payments.push(payment);

    res.json(payment);
  }

  static async pay(req: Request, res: Response) {
    const { id } = req.params;
    const payment = globalState.payments.find((p) => p.id === id);
    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }
    try {
      //   await CkbtcMinter.mint(payment.amount);
      res.json({ message: "Payment Successful" });
    } catch (error: any) {
      console.log({ error });
      throw error;
    }
    res.json({ message: "Payment Successful" });
  }
}

export default PaymentController;
