import { Material } from "../models/material.model";


const getMaterials = async (page) => {
    const materials = await Material.find().skip((page - 1) * 10).limit(10);
    return materials;
}
