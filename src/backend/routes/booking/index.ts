import express from "express";

const router = express.Router();
const cors = require("cors");

import BookingController from "../../controllers/booking";

router.options("/", cors()); // enable pre-flight request for DELETE
router.post("/", cors(), BookingController.create);

router.put("/", BookingController.update);

export default router;
