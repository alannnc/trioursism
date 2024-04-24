import { Request, Response } from "express";
import { globalState } from "../..";
import { bookingCreateSchema, bookingSchema } from "./bookingSchema";
import { v4 as uuid } from "uuid";
import PaymentController from "../payment";

class BookingController {
  static create(req: Request, res: Response) {
    const data = bookingCreateSchema.parse(req.body);
    const booking = {
      id: uuid(),
      ...data,
      status: "pending",
    };

    globalState.bookings.push(booking);

    const service = globalState.services.find(
      (service) => service.id === data.serviceId
    );
    req.body["bookingUid"] = booking.id;
    req.body["amount"] = service?.price;

    PaymentController.create(req, res);

    res.json({ success: true });
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
