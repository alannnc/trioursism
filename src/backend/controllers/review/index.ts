import { z } from "zod";
import { globalState } from "../..";
import { Request, Response } from "express";

class ReviewController {
  static findById(req: Request, res: Response) {
    const findReviewsByServiceIdSchema = z.object({
      id: z.string(),
    });
    const data = findReviewsByServiceIdSchema.parse(req.query);
    const { id } = data;

    const reviews = globalState.reviews.filter((review) => {
      return review.serviceId === id;
    });

    res.json(reviews);
  }
}

export default ReviewController;
