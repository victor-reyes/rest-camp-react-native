import { z } from "zod";

const ErrorSchema = z.object({
  SOURCE: z.string().optional(),
  MESSAGE: z.string().optional(),
});

const LastModifiedSchema = z.object({
  datetime: z.string().datetime(),
});

const EvalResultSchema = z.object({});

const InfoSchema = z.object({
  LASTMODIFIED: LastModifiedSchema.optional(),
  LASTCHANGEID: z.string().optional(),
  EVALRESULT: z.array(EvalResultSchema).optional(),
  SSEURL: z.string().optional(),
});

export { ErrorSchema, LastModifiedSchema, EvalResultSchema, InfoSchema };
