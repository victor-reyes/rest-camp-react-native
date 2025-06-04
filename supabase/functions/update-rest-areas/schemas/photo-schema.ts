import { z } from "zod";

const PhotoSchema = z.object({ Title: z.string(), Url: z.string() });

export { PhotoSchema };
