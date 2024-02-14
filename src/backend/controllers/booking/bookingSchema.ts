import z from "zod";

export const bookingSchema = z.object({
  id: z.string(),
  serviceId: z.string(),
  userId: z.string(),
  status: z.string(),
  start_date: z.string(),
  end_date: z.string(),
});
