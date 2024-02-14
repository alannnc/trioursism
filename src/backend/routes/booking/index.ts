import express from "express";

const router = express.Router();

import BookingController from "../../controllers/booking";

router.post("/", BookingController.create);

router.put("/", BookingController.update);

export default router;
