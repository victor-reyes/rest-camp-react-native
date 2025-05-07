import { z } from "zod";

const PhotoSchema = z.object({ Title: z.string(), Url: z.string() });
type Photo = z.infer<typeof PhotoSchema>;

export { PhotoSchema, Photo };
