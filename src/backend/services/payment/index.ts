import { globalState } from "../..";
import { v4 as uuid } from "uuid";

class PaymentService {
  static async createPayment(bookingUid: string, amount: number) {
    const payment = {
      bookingUid,
      amount,
      id: uuid(),
      status: "pending",
    };
    globalState.payments.push(payment);
    return payment;
  }
}

export default PaymentService;
