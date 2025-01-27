import { Router } from "express"; // Import Router from Express
import { registerUser } from "../controllers/user.controller.js"; // Import the registerUser controller
import { upload } from "../middlewares/multer.middleware.js"; // Import the Multer middleware

const router = Router(); // Create a new router instance

// Define a route for user registration
router.route("/register").post(
  upload.fields([
    {
      name: "avatar", // Name of the file field
      maxCount: 1, // Maximum number of files
    },
  ]),
  registerUser // Controller to handle the registration logic
);

export default router; // Export the router for use in other parts of the application
