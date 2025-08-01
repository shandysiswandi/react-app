import { z } from "zod";

export const schema = z.object({
  fullName: z.string().min(5, {
    message: "Full name must be at least 5 characters long.",
  }),
  email: z.email({
    message: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/\d/, {
      message: "Password must contain at least one number.",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
});

export type SchemaType = z.infer<typeof schema>;
