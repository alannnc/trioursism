import express from "express";

const router = express.Router();

router.post("/pay", (req, res) => {
  res.send("Payment Successful");
});

export default router;
