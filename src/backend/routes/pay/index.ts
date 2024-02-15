import express from "express";
import PaymentController from "../../controllers/payment";
const cors = require("cors");

const router = express.Router();
router.options("/pay", cors()); // enable pre-flight request for POST
router.post("/pay", PaymentController.pay);

export default router;
