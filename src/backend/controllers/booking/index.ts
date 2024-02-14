import { Request, Response } from "express";
import { globalState } from "../..";
import { bookingSchema } from "./bookingSchema";

class BookingController {
  static create(req: Request, res: Response) {
    const data = bookingSchema.parse(req.body);
    globalState.bookings.push(data);

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
