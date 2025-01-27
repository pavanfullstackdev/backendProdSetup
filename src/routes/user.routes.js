import { Router } from "express"; // Import Router from Express
import {
  registerUser,
  loginUser,
  logoutUser,
  refereshAccessToken,
  getCurrentUser,
} from "../controllers/user.controller.js"; // Import the registerUser controller
import { upload } from "../middlewares/multer.middleware.js"; // Import the Multer middleware
import { verifyJWT } from "../middlewares/auth.middleware.js";

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
router.route("/login").post(loginUser); // Define a route for user login

router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refereshAccessToken);
router. route("/get-user").get(verifyJWT, getCurrentUser);

export default router; // Export the router for use in other parts of the application
