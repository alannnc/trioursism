import z from "zod";

export const bookingSchema = z.object({
  id: z.string(),
  serviceId: z.string(),
  userId: z.string(),
  status: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

export const bookingCreateSchema = z.object({
  serviceId: z.string(),
  userId: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});
