import { z } from "zod";

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

export const registerSchema = z.object({
    email: z.string({ message: "Email is required" }).email({ message: "Invalid email address" }),
    password: z.string({ message: "Password is required" }).min(8, { message: "Password must be at least 8 characters long" }).regex(regex, { message: "Password must contain at least one uppercase letter, one lowercase letter, and one number" }),
    firstName: z.string({ message: "First name is required" }).min(3),
    lastName: z.string({ message: "Last name is required" }).min(3),
    phone: z.string({ message: "Phone is required" }).min(1, { message: "Phone is required" }),
    address: z.string({ message: "Address is required" }).min(1, { message: "Address is required" }),
    role: z.enum(["customer", "admin", "restaurant_owner", "courier"], { message: "Invalid role" }),
}).strict();

export const loginSchema = z.object({
    email: z.string({ message: "Email is required" }).email({ message: "Invalid email address" }),
    password: z.string({ message: "Password is required" }),
}).strict();

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export async function validateDTO<T>(schema: z.ZodSchema<T>, data: unknown): Promise<T> {
    const result = await schema.safeParseAsync(data);
    if (!result.success) {
        const message = result.error.issues.map((issue) => issue.message).join(", ");
        throw new Error(message || "Validation failed");
    }
    return result.data;
}