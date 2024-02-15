import { Request, Response } from "express";
import { globalState } from "../..";
// import { CkbtcMinter } from "../../ckbtc";
import { v4 as uuid } from "uuid";
import { paymentCreateSchema } from "./paymentSchema";
import { CkbtcLedger } from "../../ckbtc";
import { Principal } from "azle";
import PaymentService from "../../services/payment";

class PaymentController {
  static async create(req: Request, res: Response) {
    const parse = paymentCreateSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: parse.error });
    }

    const payment = PaymentService.createPayment(
      parse.data.bookingUid,
      parse.data.amount
    );

    res.json(payment);
  }

  static async pay(req: Request, res: Response) {
    const { id } = req.query;
    // look for payment pending status

    const payment = globalState.payments.find((p) => p.id === id);
    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }
    if (payment.status !== "pending") {
      return res.status(400).json({ error: "Payment already processed" });
    }

    // Obtener a quien se le va a pagar
    const booking = globalState.bookings.find(
      (b) => b.id === payment.bookingUid
    );

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Obtener el serviceId del booking

    // Con el servideId obtener el businessId y luego el userId y su address

    try {
      // grab user[0] from globalState
      const principalBuyer = Principal.fromText(globalState.users[0].principal);
      const principalOwner = Principal.fromText(globalState.users[1].principal);
      const amount = 0.5;
      const ckbtcLedger = new CkbtcLedger(
        Principal.fromText(process.env.CKBTC_LEDGER_CANISTER_ID!)
      );

      const response = await ckbtcLedger.transfer(
        principalBuyer,
        principalOwner,
        amount
      );
      console.log({ response });
      res.json({ message: "Payment Successful", resp: response });
    } catch (error: any) {
      console.log({ error });
      res.json({ error });
      // throw error;
    }
  }
}

export default PaymentController;
