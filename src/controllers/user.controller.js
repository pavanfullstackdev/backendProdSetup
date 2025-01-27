import { User } from "../models/user.model.js"; // Import User model
import { asyncHandler } from "../utils/asyncHandler.js"; // Import asyncHandler utility
import { ApiError } from "../utils/ApiError.js"; // Import ApiError utility
import { uploadOnCloudinary } from "../utils/cloudinary.js"; // Import Cloudinary upload utility
import { ApiResponse } from "../utils/ApiResponse.js"; // Import ApiResponse utility
import jwt from "jsonwebtoken"; // Import JSON Web Token library

// Function to generate access and refresh tokens
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId); // Find user by ID
    const accessToken = user.generateAccessToken(); // Generate access token
    const refreshToken = user.generateRefreshToken(); // Generate refresh token

    user.refreshToken = refreshToken; // Set refresh token in user document
    await user.save({ validateBeforeSave: false }); // Save user document without validation

    return { accessToken, refreshToken }; // Return both tokens
  } catch (error) {
    throw new ApiError(500, "Access token failed!"); // Throw error if token generation fails
  }
};

// Controller to register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body; // Destructure request body

  if (!username || !email || !password) {
    throw new ApiError(400, "Please provide all required fields"); // Check for missing fields
  }

  const userAlreadyExisted = await User.findOne({
    $or: [{ email }, { username }],
  }); // Check if user already exists

  if (userAlreadyExisted) {
    throw new ApiError(400, "User already existed"); // Throw error if user exists
  }

  const avatarLocalPath = req.files?.avatar[0]?.path; // Get avatar file path
  if (!avatarLocalPath) {
    throw new ApiError(400, "Please provide a valid image file"); // Check for valid image file
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath); // Upload avatar to Cloudinary

  if (!avatar) {
    throw new ApiError(500, "Failed to upload image"); // Throw error if upload fails
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    avatar: avatar.url,
  }); // Create new user
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  ); // Find created user and exclude password and refresh token

  if (!createdUser) {
    throw new ApiError(500, "Failed to create user"); // Throw error if user creation fails
  }
  return res
    .status(201)
    .json(new ApiResponse(201, "User created successfully", createdUser)); // Return success response
});

// Controller to log in a user
const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body; // Destructure request body
  if (!email && !username) {
    throw new ApiError(400, "Please provide Username or email "); // Check for missing fields
  }

  const user = await User.findOne({ $or: [{ email }, { username }] }); // Find user by email or username

  if (!user) {
    throw new ApiError(404, "User not found"); // Throw error if user not found
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password); // Check if password is correct

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials"); // Throw error if password is incorrect
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  ); // Generate tokens

  const options = {
    httpOnly: true,
    secure: true,
  }; // Cookie options

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  ); // Find logged-in user and exclude password and refresh token
  return res
    .status(200)
    .cookie("accessToken", accessToken, options) // Set access token cookie
    .cookie("refreshToken", refreshToken, options) // Set refresh token cookie
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in Successfully"
      )
    ); // Return success response
});

const logoutUser = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    throw new ApiError(400, "User not authenticated"); // Check if user is authenticated
  }

  // Find user and remove all tokens
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  // Set options for cookies
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out."));
});
const refereshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!refereshAccessToken) {
    throw new ApiError(401, "Unauthorized requenst");
  }
  //check are both same from db & incoming
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFERESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "refresh token expired");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };
    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access refresh token is refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Error while checking ");
  }
});
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Updated Successfully."));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(200, req.user, "current user fetched");
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    throw new ApiError(400, "All field are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account Updated Sucessfully!"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avtar file in missing");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading on avatar");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      avatar: avatar.url,
    },
    { new: true }
  ).select("-password");

  return res.status(200).json(new ApiResponse(200, user, "Avtar updated"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refereshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
}; // Export controllers
