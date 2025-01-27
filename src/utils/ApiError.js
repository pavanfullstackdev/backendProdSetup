// This file defines a custom error class for handling API errors.

class ApiError extends Error {
  // Constructor for initializing the ApiError instance
  constructor(
    statusCode, // HTTP status code for the error
    message = "Something went wrong", // Default error message
    errors = [], // Additional error details
    stack = "" // Optional stack trace
  ) {
    super(message); // Call the parent class (Error) constructor with the message
    this.statusCode = statusCode; // Set the HTTP status code
    this.data = null; // Placeholder for additional data (if any)
    this.message = message; // Set the error message
    this.success = false; // Indicate that the operation was not successful
    this.errors = errors; // Set additional error details

    if (stack) {
      this.stack = stack; // Use the provided stack trace if available
    } else {
      Error.captureStackTrace(this, this.constructor); // Capture the stack trace for debugging
    }
  }
}

export { ApiError }; // Export the ApiError class for use in other parts of the application
