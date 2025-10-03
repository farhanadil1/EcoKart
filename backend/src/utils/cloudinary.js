import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

export const uploadToCloudinary = async (filePath, folder = 'ecokart/products') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, { folder });
    fs.unlinkSync(filePath); // remove file from temp after upload
    return result.secure_url; // return the Cloudinary URL
  } catch (err) {
    throw new Error('Cloudinary upload failed');
  }
};
