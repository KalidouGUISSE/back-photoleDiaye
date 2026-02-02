import { z } from "zod";

export const annonceSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  imageBase64: z.string().startsWith("data:image/"), // 👈 base64
  price: z.number().positive(),
});

