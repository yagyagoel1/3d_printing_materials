import z from 'zod';

export const validateCreateMaterial = ({ name, technology, colors, pricePerGram, applicationTypes }) => {
    const schema = z.object({
        name: z.string().min(1),
        technology: z.string().min(1),
        colors: z.array(z.string().min(1)),
        pricePerGram: z.number().positive(),
        applicationTypes: z.array(z.string().min(1))
    });
    return schema.safeParse({ name, technology, colors, pricePerGram, applicationTypes });
}
export const validateObjectId = (id) => {
    const schema = z.object({
        id: z.string().uuid()
    });
    return schema.safeParse({ id });
}
