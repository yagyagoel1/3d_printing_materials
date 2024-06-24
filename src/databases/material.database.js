import { Material } from "../models/material.model";


export const getMaterials = async (page) => {
    const materials = await Material.find().skip((page - 1) * 10).limit(10);
    return materials;
}
export const createNewMaterial = async ({ name, technology, colors, pricePerGram, applicationTypes, imageUrl }) => {
    const material = new Material({ name, technology, colors, pricePerGram, applicationTypes, imageUrl });
    await material.save();
    return material;
}
