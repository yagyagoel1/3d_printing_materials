import express from 'express';
import { createMaterial, getAllMaterials } from '../controllers/material.controller';
import { upload } from '../middlewares/multer.middleware';




const router = express.Router();

router.route('/').get(getAllMaterials).post(upload.single("Material Image"), createMaterial);


export default router;
