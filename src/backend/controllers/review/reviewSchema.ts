import z from "zod";

export const reviewSchema = z.object({
  id: z.string(),
  bookingId: z.string(),
  serviceId: z.string(),
  userId: z.string(),
  userName: z.string(),
  rating: z.number(),
  comment: z.string(),
});
