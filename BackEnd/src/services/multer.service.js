import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_url: process.env.CLOUDINARY_URL
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "cabanas",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage: storage });

export default upload;
