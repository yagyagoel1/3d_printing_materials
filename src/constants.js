export const DB_NAME = "IAMRAPID";
export const redisConnection = {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT) || 6379,
};