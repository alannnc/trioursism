import z from "zod";

const businessSchema = z.object({
  id: z.string(),
  name: z.string(),
  legalName: z.string(),
  description: z.string(),
  images: z.array(z.string()),
  location: z.string(),
  type: z.string(),
  owner: z.string(),
  lat: z.number(),
  long: z.number(),
});

module.exports = { businessSchema };
