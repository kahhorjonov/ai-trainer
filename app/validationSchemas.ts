import { z } from "zod";

export const scriptSchema = z.object({
  description: z.string().min(1, "Description is required.").max(65535),
});

export const patchScriptSchema = z.object({
  description: z.string().min(1).max(65535).optional(),
});

export const getScriptSchema = z.object({
  page: z.number().min(1, "Page is required"),
  pageSize: z.number().min(1, "Page Size is required"),
});
