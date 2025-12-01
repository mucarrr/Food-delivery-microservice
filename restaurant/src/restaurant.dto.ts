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
    deliveryTime: z.coerce.number().min(1).optional(),
    minOrderAmount: z.coerce.number().int().nonnegative().optional(),
    name: z.coerce.string().optional(),
})

export const menuSchema = z.object({
    name: z.string({ message: "Name is required" }).min(3, { message: "Name must be at least 3 characters long" }),
    description: z.string({ message: "Description is required" }).min(6, { message: "Description must be at least 6 characters long" }),
    price: z.number({ message: "Price is required" }).min(0, { message: "Price must be greater than 0" }),
    image: z.url({ message: "Image is required" }).optional(),
    category: z.string({ message: "Category is required" }).min(3, { message: "Category must be at least 3 characters long" }),
    ingredients: z.array(z.string({ message: "Ingredients are required" })).optional(),
    allergens: z.array(z.string({ message: "Allergens are required" })).optional(),
    isVegetarian: z.boolean({ message: "Is vegetarian is required" }).default(false),
    isAvailable: z.boolean({ message: "Is available is required" }).default(true),
    preparationTime: z.number({ message: "Preparation time is required" }).min(5).max(120),
});

export type CreateRestaurantInput = z.infer<typeof restaurantSchema>;
export type GetRestaurantsQueryInput = z.infer<typeof getRestaurantsQuerySchema>;
export type CreateMenuInput = z.infer<typeof menuSchema>;

export async function validateRestaurantDTO<T>(schema: z.ZodSchema<T>, data: unknown): Promise<T> {
    const result = await schema.safeParseAsync(data);
    if (!result.success) {
        const message = result.error.issues.map((issue) => issue.message).join(", ");
        throw new Error(message || "Validation failed");
    }
    return result.data;
}