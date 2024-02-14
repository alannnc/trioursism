import { Principal, Server, ic } from "azle";
import express from "express";
import z from "zod";
import { CkbtcLedger, CkbtcMinter } from "./ckbtc";
import { userSchema } from "./controllers/users/usersSchema";
import { businessSchema } from "./controllers/business/businessSchema";
import { serviceSchema } from "./controllers/services/servicesSchema";
import { bookingSchema } from "./controllers/booking/bookingSchema";
import { reviewSchema } from "./controllers/review/reviewSchema";
import { paymentSchema } from "./controllers/payment/paymentSchema";

import authRoute from "./routes/auth/users";
import businessRoute from "./routes/business";
import serviceRoute from "./routes/service";
import bookingRoute from "./routes/booking";
import reviewRoute from "./routes/review";
// import paymentRoute from "./routes/payment";

const globalStateSchema = z.object({
  users: z.array(userSchema),
  business: z.array(businessSchema),
  services: z.array(serviceSchema),
  bookings: z.array(bookingSchema),
  reviews: z.array(reviewSchema),
  payments: z.array(paymentSchema),
});

type GlobalState = z.TypeOf<typeof globalStateSchema>;

export let globalState: GlobalState = {
  users: [],
  business: [],
  services: [
    {
      id: "1",
      name: "Hotel 1",
      description: "Hotel 1 Description",
      images: ["https://www.google.com"],
      price: 100,
      location: "Hotel 1 Location",
      type: "Hotel",
      unit: "noche",
      owner: "1",
      status: "Active",
      lat: 0,
      long: 0,
      country: "Mexico",
      state: "Puebla",
      city: "Cholula",
    },
    {
      id: "2",
      name: "Hotel 2",
      description: "Hotel 2 Description",
      images: ["https://www.google.com"],
      price: 100,
      unit: "noche",
      location: "Hotel 2 Location",
      type: "Hotel",
      owner: "1",
      status: "Active",
      lat: 0,
      long: 0,
      country: "Mexico",
      state: "Puebla",
      city: "Cholula",
    },
    {
      id: "3",
      name: "Hotel 3",
      unit: "noche",
      description: "Hotel 3 Description",
      images: ["https://www.google.com"],
      price: 100,
      location: "Hotel 3 Location",
      type: "Hotel",
      owner: "1",
      status: "Active",
      lat: 0,
      long: 0,
      country: "Mexico",
      state: "Puebla",
      city: "Cholula",
    },
  ],
  bookings: [],
  reviews: [
    {
      id: "1",
      bookingId: "1",
      serviceId: "1",
      userId: "1",
      userName: "John Doe",
      rating: 5,
      comment: "Great service",
    },
    {
      id: "2",
      bookingId: "2",
      serviceId: "1",
      userId: "1",
      rating: 4,
      userName: "Dan Smith",
      comment: "Had a great time",
    },
  ],
  payments: [],
};

// Web 3 Hotel/Activities Booking API
export default Server(() => {
  const app = express();

  app.use(express.json());

  // Init ckBTC canisters
  const ckbtcLedger = new CkbtcLedger(
    Principal.fromText(process.env.CKBTC_LEDGER_CANISTER_ID!)
  );
  const ckbtcMinter = new CkbtcMinter(
    Principal.fromText(process.env.CKBTC_MINTER_CANISTER_ID!)
  );

  app.get("/global-state", (req, res) => {
    res.json(globalState);
  });

  app.get("/balance", async (req, res) => {
    try {
      const balance = await ckbtcLedger.getBalance(generateId());
      res.json({ balance });
    } catch (error: any) {
      console.log({ error });
      throw error;
    }
  });

  app.use("/auth", authRoute);

  app.use("/business", businessRoute);

  app.use("/service", serviceRoute);

  app.use("/booking", bookingRoute);

  app.use("/review", reviewRoute);

  // app.use("/payment", require("./routes/payment"));

  return app.listen();
});

function generateId(): Principal {
  const randomBytes = new Array(29)
    .fill(0)
    .map((_) => Math.floor(Math.random() * 256));

  return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}
