// This file defines middleware for handling file uploads using Multer.

import multer from "multer"; // Import Multer library

// Configure storage settings for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name for the uploaded file

    // We can add a suffix to handle files with the same name
  },
});

// Create an upload instance with the configured storage settings
export const upload = multer({
  storage,
});
