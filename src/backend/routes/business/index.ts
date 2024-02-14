import express from "express";

import BusinessController from "../../controllers/business";

const router = express.Router();

router.post("/", BusinessController.create);

export default router;
