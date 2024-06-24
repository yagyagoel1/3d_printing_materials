import express from 'express';




const router = express.Router();

router.route('/').get(getAllMaterials).post(createMaterial);


export default router;
