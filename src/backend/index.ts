import { Principal, Server } from "azle";
import express from "express";
import z from "zod";
import { CkbtcLedger, CkbtcMinter } from "./ckbtc";
import { userSchema } from "./controllers/users/usersSchema";
import { businessSchema } from "./controllers/business/businessSchema";
import { serviceSchema } from "./controllers/services/servicesSchema";
import { bookingSchema } from "./controllers/booking/bookingSchema";
import { reviewSchema } from "./controllers/review/reviewSchema";
import { paymentSchema } from "./controllers/payment/paymentSchema";
// import initSqlJs from "sql.js/dist/sql-asm.js";

// import prisma from "@prisma/client";
// import { readFile } from "fs/promises";

import authRoute from "./routes/auth/users";
import businessRoute from "./routes/business";
import serviceRoute from "./routes/service";
import bookingRoute from "./routes/booking";
import reviewRoute from "./routes/review";
import paymentRoute from "./routes/pay";
import { generateId } from "./lib/utils";
import { AppDataSource } from "./db/data-source";
import { User } from "./db/entity/User";

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
  business: [
    {
      id: "1",
      name: "Hotel 1",
      legalName: "Hotel SA de CV",
      description: "Hotel 1 Description",
      images: ["https://www.google.com"],
      location: "Cholula Puebla",
      type: "Hotel",
      owner: "1",
      lat: 19.07,
      long: 98.302,
    },
  ],
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
  // AppDataSource.initialize()
  //   .then(() => {
  //     console.log("Data Source has been initialized!");
  //   })
  //   .catch((err) => {
  //     console.error("Error during Data Source initialization:", err);
  //   });

  const app = express();

  app.use(express.json());

  app.get("/global-state", async (req, res) => {
    try {
      // const users = await AppDataSource.getRepository(User).find();
      // return res.json({ users });
    } catch (error: any) {
      console.log({ error });
      throw error;
    }
    // console.log("prisma", JSON.stringify(prisma, null, 2));
    res.json(globalState);
  });

  app.get("/balance", async (req, res) => {
    const ckbtcLedger = new CkbtcLedger(
      Principal.fromText(process.env.CKBTC_LEDGER_CANISTER_ID!)
    );

    try {
      const balance = await ckbtcLedger.getBalance(generateId());
      res.json({ balance });
    } catch (error: any) {
      console.log({ error });
      throw error;
    }
  });

  app.post("/balance", async (req, res) => {
    const ckbtcMinter = new CkbtcMinter(
      Principal.fromText(process.env.CKBTC_MINTER_CANISTER_ID!)
    );

    try {
      const user = globalState.users[0];
      const principal = Principal.fromText(user.principal);
      const result = await ckbtcMinter.updateBalance(principal);
      res.json({
        result,
        principal: Principal.fromText(user.principal),
        p2: principal,
      });
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

  app.use("/payment", paymentRoute);

  return app.listen();
});
