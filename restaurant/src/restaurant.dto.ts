import { z } from "zod";

export const restaurantSchema = z.object({
    name: z.string({ message: "Name is required" }),
    description: z.string({ message: "Description is required" }),
    address: z.string({ message: "Address is required" }),
    phone: z.string({ message: "Phone is required" }),
    email: z.string({ message: "Email is required" }),
    categories: z.array(z.string({ message: "Categories are required" })),
    deliveryTime: z.number({ message: "Delivery time is required" }),
    minOrderAmount: z.number({ message: "Minimum order amount is required" }),
    deliveryFee: z.number({ message: "Delivery fee is required" }),
    isActive: z.boolean({ message: "Is active is required" }),
    isOpen: z.boolean({ message: "Is open is required" })
});

export const getRestaurantsQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    category: z.coerce.string().optional(),
    deliveryTime: z.coerce.number().min(15).default(15),
    minOrderAmount: z.coerce.number().int().positive().default(0),
    name: z.coerce.string().optional(),
})

export type CreateRestaurantInput = z.infer<typeof restaurantSchema>;
export type GetRestaurantsQueryInput = z.infer<typeof getRestaurantsQuerySchema>;

export async function validateRestaurantDTO<T>(schema: z.ZodSchema<T>, data: unknown): Promise<T> {
    const result = await schema.safeParseAsync(data);
    if (!result.success) {
        const message = result.error.issues.map((issue) => issue.message).join(", ");
        throw new Error(message || "Validation failed");
    }
    return result.data;
}