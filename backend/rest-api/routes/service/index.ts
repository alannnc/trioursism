import express from "express";
import ServiceController from "../../controllers/services";

const router = express.Router();

router.post("/", ServiceController.create);

router.get("/list", ServiceController.list);

router.get("/find-by-id", ServiceController.findById);

export default router;
