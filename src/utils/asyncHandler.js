// This file defines a function to handle asynchronous operations in Express routes.

const asyncHandler = (requestHandler) => {
  // Return a function that handles the request
  return (req, res, next) => {
    // Resolve the request handler promise and catch any errors
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler }; // Export the asyncHandler function for use in other parts of the application

// HOC (Higher-Order Component) examples for asyncHandler
// const asyncHandler = () => { }
// const asyncHandler = (func) => () => { }
// const asyncHandler = (func) => async () => { }

// try-catch approach example for asyncHandler
// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next);
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };
