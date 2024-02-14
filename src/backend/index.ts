import { Server } from "azle";
import express from "express";
import z from "zod";
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

// const userSchema = z.object({
//   id: z.string(),
//   name: z.string(),
//   email: z.string().email(),
// });

// const businessSchema = z.object({
//   id: z.string(),
//   name: z.string(),
//   legalName: z.string(),
//   description: z.string(),
//   images: z.array(z.string()),
//   location: z.string(),
//   type: z.string(),
//   owner: z.string(),
//   lat: z.number(),
//   long: z.number(),
// });

// const findServiceSchema = z.object({
//   country: z.string().optional(),
//   state: z.string().optional(),
//   city: z.string().optional(),
// });

// const serviceSchema = z.object({
//   id: z.string(),
//   name: z.string(),
//   description: z.string(),
//   images: z.array(z.string()),
//   price: z.number(),
//   unit: z.string(),
//   location: z.string(),
//   type: z.string(),
//   owner: z.string(),
//   status: z.string(),
//   lat: z.number(),
//   long: z.number(),
//   country: z.string(),
//   state: z.string(),
//   city: z.string(),
// });

// const bookingSchema = z.object({
//   id: z.string(),
//   serviceId: z.string(),
//   userId: z.string(),
//   status: z.string(),
//   start_date: z.string(),
//   end_date: z.string(),
// });

// const reviewSchema = z.object({
//   id: z.string(),
//   bookingId: z.string(),
//   serviceId: z.string(),
//   userId: z.string(),
//   userName: z.string(),
//   rating: z.number(),
//   comment: z.string(),
// });

// const paymentSchema = z.object({
//   id: z.string(),
//   booking: z.string(),
//   amount: z.number(),
//   status: z.string(),
// });

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

  // const router = express.Router();

  app.get("/global-state", (req, res) => {
    res.json(globalState);
  });

  // api endpoints

  // sign in using II @@NOTE: not working for express right now

  // user profile creation
  // name, email
  // app.post("/create-user", (req, res) => {
  //   const data = userSchema.parse(req.body);

  //   globalState.users.push(data);

  //   res.json({ success: true });
  // });

  // business creation
  // name, address, legal name, phone, email, website, socials, description, images
  // app.post("/create-business", (req, res) => {
  //   const data = serviceSchema.parse(req.body);

  //   globalState.services.push(data);

  //   res.json({ success: true });
  // });

  // create service
  // name, description, images, price, location, type, owner
  // app.post("/create-service", (req, res) => {
  //   const data = serviceSchema.parse(req.body);

  //   globalState.services.push(data);

  //   res.json({ success: true });
  // });

  // list services by location
  // app.get("/list-services", (req, res) => {
  //   const data = findServiceSchema.parse(req.query);
  //   const { country, state, city } = data;

  //   // @TODO: list by location
  //   // const services = globalState.services.filter(service => {
  //   //   const serviceLocation = `${service.country}, ${service.state}, ${service.city}`;
  //   //   return serviceLocation === `${country}, ${state}, ${city}`;
  //   // });

  //   const services = globalState.services;

  //   res.json(services);
  // });

  // find services by id
  // app.get("/find-service", (req, res) => {
  //   const findServiceSchema = z.object({
  //     id: z.string(),
  //   });
  //   const data = findServiceSchema.parse(req.query);
  //   const { id } = data;

  //   const services = globalState.services.find((service) => {
  //     return service.id === id;
  //   });

  //   res.json(services);
  // });

  // app.get("/find-reviews", (req, res) => {
  //   const findReviewsByServiceIdSchema = z.object({
  //     id: z.string(),
  //   });
  //   const data = findReviewsByServiceIdSchema.parse(req.query);
  //   const { id } = data;

  //   const reviews = globalState.reviews.filter((review) => {
  //     return review.serviceId === id;
  //   });

  //   res.json(reviews);
  // });

  // book service
  // app.post("/book-service", (req, res) => {
  //   const data = bookingSchema.parse(req.body);

  //   globalState.bookings.push(data);

  //   res.json({ success: true });
  // });

  // accept/cancel booking
  // app.put("/update-booking", (req, res) => {
  //   const data = bookingSchema.parse(req.body);

  //   const { id, status } = data;

  //   const booking = globalState.bookings.find((booking) => {
  //     return booking.id === id;
  //   });

  //   if (booking) {
  //     booking.status = status;
  //   }

  //   res.json({ success: true });
  // });

  // pay booking

  // review service

  // reply service

  app.use("/auth", authRoute);

  app.use("/business", businessRoute);

  app.use("/service", serviceRoute);

  app.use("/booking", bookingRoute);

  app.use("/review", reviewRoute);

  // app.use("/payment", require("./routes/payment"));

  return app.listen();
});
