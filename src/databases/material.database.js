import { Material } from "../models/material.model";


export const getMaterials = async (page) => {
    const materials = await Material.find().skip((page - 1) * 10).limit(10).select("-__v -imageUrl");
    return materials;
}
export const createNewMaterial = async ({ name, technology, colors, pricePerGram, applicationTypes, imageUrl }) => {
    const material = new Material({ name, technology, colors, pricePerGram, applicationTypes, imageUrl });
    await material.save();
    return material;
}

export const getMaterialById = async (id) => {
    const material = await Material.findById(id);
    return material;
}
