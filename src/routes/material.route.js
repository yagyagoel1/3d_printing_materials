import express from 'express';
import { createMaterial, deleteMaterial, getAllMaterials, getMaterial, updateMaterial } from '../controllers/material.controller.js';
import { upload } from '../middlewares/multer.middleware.js';




const router = express.Router();

router.route('/').get(getAllMaterials).post(upload.single("material_img"), createMaterial);
router.route("/:id").get(getMaterial).put(updateMaterial).delete(deleteMaterial);

export default router;
