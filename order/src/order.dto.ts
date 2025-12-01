import z from "zod";

export const addressSchema = z.object({
    title: z.string({ message: "Title is required" }),
    street: z.string({ message: "Street is required" }),
    city: z.string({ message: "City is required" }),
    state: z.string({ message: "State is required" }),
    zip: z.string({ message: "Zip is required" }),
    country: z.string({ message: "Country is required" }),
    isDefault: z.boolean().default(false),
});
export const itemSchema = z.object({
    itemId: z.string({ message: "Item ID is required" }),
    quantity: z.number({ message: "Quantity is required" }),
    name: z.string({ message: "Name is required" }),
    price: z.number({ message: "Price is required" }),
});
export const orderSchema = z.object({
    restaurantId: z.string({ message: "Restaurant ID is required" }),
    items: z.array(itemSchema),
    deliveryAddress: addressSchema,
    paymentMethod: z.enum(['cash', 'card', 'wallet', 'other'], { message: "Invalid payment method" }),
    specialInstructions: z.string(),
    totalPrice: z.number(),
});

export type AdressInput = z.infer<typeof addressSchema>;
export type ItemInput = z.infer<typeof itemSchema>;
export type OrderInput = z.infer<typeof orderSchema>;

export async function validateDTO<T>(schema: z.ZodSchema<T>, data: unknown): Promise<T> {
    const result = await schema.safeParseAsync(data);
    if (!result.success) {
        const message = result.error.issues.map((issue) => issue.message).join(", ");
        throw new Error(message || "Validation failed");
    }
    return result.data;
}