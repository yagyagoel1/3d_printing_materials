import { Queue, Worker } from 'bullmq';
import { redisConnection } from '../../constants.js';
import { logger } from '../../index.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
export const QueueName = 'updatingOnCloudinary';
export const queue = new Queue(QueueName,
    { connection: redisConnection });

export const handler = new Worker(QueueName, async (job) => {
    const { localFilePath, imageUrl } = job.data;
    try {
        if (!localFilePath || !imageUrl) {
            throw new Error("localFilePath or imageUrl not found")
        }
        let response;
        const publicId = imageUrl.split("/")[imageUrl.split("/").length - 1].split(".")[0];
        if (!publicId) throw new Error("public id not found")
        if (!process.env.TEST) {
            response = await cloudinary.uploader.upload(localFilePath, {
                public_id: publicId,
                overwrite: true,
                resource_type: "image",
            });
        } else {
            response = { url: "test-url" };
        }
        //file has been uploaded
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        logger.error("error while uploading image on cloudinary", error);
        fs.unlinkSync(localFilePath, "job.data", job.data); //remove the locally saved file as the operation got failed
        throw new Error("Error while uploading image on cloudinary", job.data)
    }
}, { connection: redisConnection });

handler.on('completed', (job) => {
    logger.info(`Job with ID ${job.id} has been completed`);
});

handler.on('failed', (job, err) => {
    logger.error(`Job with ID ${job.id} has been failed with ${err.message}`);
});
export const addUpdateOnCloudinaryJob = async (data) => {
    await queue.add('updatingOnCloudinary', data);
};