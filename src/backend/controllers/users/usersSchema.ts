import z from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  principal: z.string(),
  address: z.string(),
});

export const userCreateSchema = z.object({
  name: z.string(),
  password: z.string(),
  email: z.string().email(),
});
