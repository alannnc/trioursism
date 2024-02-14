import express from "express";
import PaymentController from "../../controllers/payment";

const router = express.Router();

router.post("/pay", PaymentController.pay);

export default router;
