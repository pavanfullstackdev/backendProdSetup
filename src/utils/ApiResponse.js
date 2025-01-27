// This file defines a class for handling API responses.

class ApiResponse {
  // Constructor for initializing the ApiResponse instance
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode; // HTTP status code for the response
    this.data = data; // Data to be sent in the response
    this.message = message; // Message to be sent in the response
    this.success = statusCode < 400; // Indicate if the operation was successful based on the status code
  }
}

export { ApiResponse }; // Export the ApiResponse class for use in other parts of the application
