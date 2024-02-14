import z from "zod";

export const paymentSchema = z.object({
  id: z.string(),
  booking: z.string(),
  amount: z.number(),
  status: z.string(),
});
