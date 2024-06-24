import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === "image") {
        cb(null, true);
    } else {
        cb(new Error("File type not allowed"), false);
    }
};
export const upload = multer({
    storage,
    fileFilter,//fileType check
    limits: { fileSize: 1024 * 1024 * 10 },// 10MB
});