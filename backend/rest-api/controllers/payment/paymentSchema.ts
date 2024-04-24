import z from "zod";

export const paymentSchema = z.object({
  id: z.string(),
  bookingUid: z.string(),
  amount: z.number(),
  status: z.string(),
});

export const paymentCreateSchema = z.object({
  bookingUid: z.string(),
  amount: z.number(),
});
