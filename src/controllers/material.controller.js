import { getMaterialById } from "../databases/material.database";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { validateCreateMaterial } from "../validations/material.validation";


const getAllMaterials = asyncHandler(async (req, res) => {

    const page = parseInt(req.query.page) || 1;


    const materials = await getMaterials(page);
    res.status(200).json(new ApiResponse(200, "Successfully fetched the materials", materials))

});

const createMaterial = asyncHandler(async (req, res) => {
    const { name, technology, colors, pricePerGram, applicationTypes } = req.body;
    const validate = validateCreateMaterial({ name, technology, colors, pricePerGram, applicationTypes });
    if (!validate.success) {
        return res.status(400).json(new ApiError(400, validate.error.errors[0].message));
    }
    const materialImage = req.file?.path;
    if (!materialImage) {
        return res.status(400).json(new ApiError(400, "Material image is required"));
    }
    const imageUrl = await uploadOnCloudinary(materialImage);
    if (!imageUrl.url) {
        return res.status(500).json(new ApiError(500, "Error while uploading image"));
    }

    const material = await createNewMaterial({ name, technology, colors, pricePerGram, applicationTypes, imageUrl: imageUrl.url });
    res.status(201).json(new ApiResponse(201, "Material created successfully", material));
});

const getMaterial = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const validate = validateObjectId(id);
    if (!validate.success) {
        return res.status(400).json(new ApiError(400, validate.error.errors[0].message));
    }
    const material = await getMaterialById(id);
    if (!material) {
        return res.status(404).json(new ApiError(404, "Material not found"));
    }
    res.status(200).json(new ApiResponse(200, "Material fetched successfully", material));
});
const updateMaterial = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const validate = validateObjectId(id);
    if (!validate.success) {
        return res.status(400).json(new ApiError(400, validate.error.errors[0].message));
    }
    const material = await getMaterialById(id);
    if (!material) {
        return res.status(404).json(new ApiError(404, "Material not found"));
    }
    const { name, technology, colors, pricePerGram, applicationTypes } = req.body;
    const validateMaterial = validateCreateMaterial({ name, technology, colors, pricePerGram, applicationTypes });
    if (!validateMaterial.success) {
        return res.status(400).json(new ApiError(400, validateMaterial.error.errors[0].message));
    }
    let updatedMaterial;
    if (req.file) {
        const imageUrl = await uploadOnCloudinary(req.file.path);
        if (!imageUrl.url) {
            return res.status(500).json(new ApiError(500, "Error while uploading image"));
        }

        updatedMaterial = await updateMaterialById(id, { name, technology, colors, pricePerGram, applicationTypes, imageUrl: imageUrl.url });

    }
    else {
        updatedMaterial = await updateMaterialById(id, { name, technology, colors, pricePerGram, applicationTypes });
    }
    res.status(200).json(new ApiResponse(200, "Material updated successfully", updatedMaterial));
});
const deleteMaterial = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const validate = validateObjectId(id);
    if (!validate.success) {
        return res.status(400).json(new ApiError(400, validate.error.errors[0].message));
    }
    const material = await getMaterialById(id);
    if (!material) {
        return res.status(404).json(new ApiError(404, "Material not found"));
    }
    const deletedMaterial = await findMaterialByIdAndDelete(id);
    res.status(200).json(new ApiResponse(200, "Material deleted successfully"));

});

export { getAllMaterials, createMaterial, getMaterial, updateMaterial, deleteMaterial }