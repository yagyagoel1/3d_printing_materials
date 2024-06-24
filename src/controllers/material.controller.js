import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";


const getAllMaterials = asyncHandler(async (req, res) => {

    const page = parseInt(req.query.page) || 1;


    const materials = await getMaterials(page);
    res.status(200).json(new ApiResponse(200, "Successfully fetched the materials", materials))

});


export { getAllMaterials, createMaterial }