import { z } from "zod";

export const updateOrderStatusSchema = z.object({
    status: z.enum([ 'on_the_way', 'delivered', 'cancelled']),
    location: z.object({
        latitude: z.number(),
        longitude: z.number(),
    }).optional(),
    notes: z.string().optional(),
})

export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;




export async function validateDTO<T>(schema: z.ZodSchema<T>, data: unknown): Promise<T> {
    const result = await schema.safeParseAsync(data);
    if (!result.success) {
        const message = result.error.issues.map((issue) => issue.message).join(", ");
        throw new Error(message || "Validation failed");
    }
    return result.data;
}