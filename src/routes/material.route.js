import express from 'express';
import { createMaterial, deleteMaterial, getAllMaterials, getMaterial, updateMaterial } from '../controllers/material.controller';
import { upload } from '../middlewares/multer.middleware';




const router = express.Router();

router.route('/').get(getAllMaterials).post(upload.single("material_img"), createMaterial);
router.route("/:id").get(getMaterial).put(updateMaterial).delete(deleteMaterial);

export default router;
