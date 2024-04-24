import express from "express";
import ReviewController from "../../controllers/review";

const router = express.Router();

router.get("/find-by-id", ReviewController.findById);

export default router;
