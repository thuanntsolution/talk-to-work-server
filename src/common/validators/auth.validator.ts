import z from 'zod'

export const emailSchema = z.string().trim().email().min(1).max(256)
export const passwordSchema = z.string().trim().min(6).max(256)
export const verificationCodeSchema = z.string().trim().min(1).max(256)

export const registerSchema = z
  .object({
    name: z.string().trim().min(1).max(255),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Password doesn't match",
    path: ['confirmPassword']
  })

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  userAgent: z.string().optional()
})
