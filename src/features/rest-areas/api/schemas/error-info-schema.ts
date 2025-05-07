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

type ErrorInfo = z.infer<typeof ErrorSchema>;
type LastModified = z.infer<typeof LastModifiedSchema>;
type EvalResult = z.infer<typeof EvalResultSchema>;
type Info = z.infer<typeof InfoSchema>;

export {
  ErrorSchema,
  LastModifiedSchema,
  EvalResultSchema,
  InfoSchema,
  ErrorInfo,
  LastModified,
  EvalResult,
  Info,
};
