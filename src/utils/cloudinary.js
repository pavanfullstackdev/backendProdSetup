// This file handles uploading files to Cloudinary and removing local files after upload.

// Import Cloudinary library
import { v2 as cloudinary } from "cloudinary";
// Import file system module
import fs from "fs";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY, // Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRETE, // Cloudinary API secret
});

// Function to upload a file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null; // Return null if no file path is provided
    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // Automatically detect the file type
    });
    // Remove the local file after upload
    fs.unlinkSync(localFilePath);
    // Return the Cloudinary response
    return response;
  } catch (err) {
    // Remove the local file if an error occurs during upload
    fs.unlinkSync(localFilePath); // Remove the locally temporary file
    return null;
  }
};

export { uploadOnCloudinary }; // Export the uploadOnCloudinary function for use in other parts of the application
