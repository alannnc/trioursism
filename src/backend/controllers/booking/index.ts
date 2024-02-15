import { Request, Response } from "express";
import { globalState } from "../..";
import { bookingCreateSchema, bookingSchema } from "./bookingSchema";
import { v4 as uuid } from "uuid";
import PaymentController from "../payment";
import PaymentService from "../../services/payment";

class BookingController {
  static async create(req: Request, res: Response) {
    const parse = bookingCreateSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: parse.error });
    }
    const data = parse.data;
    const booking = {
      id: uuid(),
      ...data,
      status: "pending",
    };

    globalState.bookings.push(booking);

    const service = globalState.services.find(
      (service) => service.id === data.serviceId
    );
    if (!service?.price) {
      return res.status(400).json({ error: "Service not found" });
    }
    req.body["bookingUid"] = booking.id;
    req.body["amount"] = service?.price;

    const payment = await PaymentService.createPayment(
      booking.id,
      service?.price
    );

    res.json({ booking, payment });
  }

  static update(req: Request, res: Response) {
    const data = bookingSchema.parse(req.body);
    const { id, status } = data;

    const booking = globalState.bookings.find((booking) => {
      return booking.id === id;
    });

    if (booking) {
      booking.status = status;
    }

    res.json({ success: true });
  }
}

export default BookingController;
