import z from "zod";

export const findServiceSchema = z.object({
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
});

export const serviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  images: z.array(z.string()),
  price: z.number(),
  unit: z.string(),
  location: z.string(),
  type: z.string(),
  owner: z.string(),
  status: z.string(),
  lat: z.number(),
  long: z.number(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
});

export const findByIdServiceSchema = z.object({
  id: z.string(),
});
