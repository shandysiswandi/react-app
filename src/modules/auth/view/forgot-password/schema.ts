import { z } from "zod";

export const schema = z.object({
  email: z.email({
    message: "Please enter a valid email address.",
  }),
});

export type SchemaType = z.infer<typeof schema>;
