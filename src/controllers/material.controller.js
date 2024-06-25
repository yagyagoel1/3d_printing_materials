import {
  createNewMaterial,
  findMaterialByIdAndDelete,
  getMaterialById,
  getMaterialByName,
  getMaterials,
  updateMaterialById,
} from "../databases/material.database.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {
  validateCreateMaterial,
  validateObjectId,
} from "../validations/material.validation.js";

const getAllMaterials = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;

  const materials = await getMaterials(page);
  res
    .status(200)
    .json(
      new ApiResponse(200, "Successfully fetched the materials", materials)
    );
});

const createMaterial = asyncHandler(async (req, res) => {
  let { name, technology, colors, pricePerGram, applicationTypes } = req.body;
  colors = JSON.parse(colors);
  applicationTypes = JSON.parse(applicationTypes);
  const validate = validateCreateMaterial({
    name,
    technology,
    colors,
    pricePerGram: parseFloat(pricePerGram),
    applicationTypes,
  });
  if (!validate.success) {
    return res
      .status(400)
      .json(new ApiError(400, validate.error.errors[0].message));
  }
  const materialExists = await getMaterialByName(name);
  if (materialExists) {
    return res.status(400).json(new ApiError(400, "Material already exists"));
  }
  const materialImage = req.file?.path;
  if (!materialImage) {
    return res
      .status(400)
      .json(new ApiError(400, "Material image is required"));
  }
  const imageUrl = await uploadOnCloudinary(materialImage);
  if (!imageUrl.url) {
    return res
      .status(500)
      .json(new ApiError(500, "Error while uploading image"));
  }

  const material = await createNewMaterial({
    name,
    technology,
    colors,
    pricePerGram: parseFloat(pricePerGram),
    applicationTypes,
    imageUrl: imageUrl.url,
  });
  res
    .status(201)
    .json(new ApiResponse(201, "Material created successfully", material));
});

const getMaterial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const validate = validateObjectId(id);
  if (!validate.success) {
    return res
      .status(400)
      .json(new ApiError(400, validate.error.errors[0].message));
  }
  const material = await getMaterialById(id);
  if (!material) {
    return res.status(404).json(new ApiError(404, "Material not found"));
  }
  res
    .status(200)
    .json(new ApiResponse(200, "Material fetched successfully", material));
});
const updateMaterial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const validate = validateObjectId(id);
  if (!validate.success) {
    return res
      .status(400)
      .json(new ApiError(400, validate.error.errors[0].message));
  }
  const material = await getMaterialById(id);
  if (!material) {
    return res.status(404).json(new ApiError(404, "Material not found"));
  }

  let { name, technology, colors, pricePerGram, applicationTypes } = req.body;

  let updatedMaterial;
  if (req.file) {
    colors = JSON.parse(colors);
    applicationTypes = JSON.parse(applicationTypes);

    const validateMaterial = validateCreateMaterial({
      name,
      technology,
      colors,
      pricePerGram: parseFloat(pricePerGram),
      applicationTypes,
    });
    if (!validateMaterial.success) {
      return res.status(400).json(new ApiError(400, validateMaterial.error));
    }
    const imageUrl = await uploadOnCloudinary(req.file.path);
    if (!imageUrl.url) {
      return res
        .status(500)
        .json(new ApiError(500, "Error while uploading image"));
    }

    updatedMaterial = await updateMaterialById(id, {
      name,
      technology,
      colors,
      pricePerGram,
      applicationTypes,
      imageUrl: imageUrl.url,
    });
  } else {
    const validateMaterial = validateCreateMaterial({
      name,
      technology,
      colors,
      pricePerGram: parseFloat(pricePerGram),
      applicationTypes,
    });
    if (!validateMaterial.success) {
      return res
        .status(400)
        .json(new ApiError(400, validateMaterial.error.errors[0].message));
    }
    updatedMaterial = await updateMaterialById(id, {
      name,
      technology,
      colors,
      pricePerGram,
      applicationTypes,
    });
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, "Material updated successfully", updatedMaterial)
    );
});
const deleteMaterial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const validate = validateObjectId(id);
  if (!validate.success) {
    return res
      .status(400)
      .json(new ApiError(400, validate.error.errors[0].message));
  }
  const material = await getMaterialById(id);
  if (!material) {
    return res.status(404).json(new ApiError(404, "Material not found"));
  }
  await findMaterialByIdAndDelete(id);
  res.status(200).json(new ApiResponse(200, "Material deleted successfully"));
});

export {
  getAllMaterials,
  createMaterial,
  getMaterial,
  updateMaterial,
  deleteMaterial,
};
