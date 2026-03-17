/**
 * Validation Error Handler
 *
 * This function handles validation errors  
 * It logs the error message for debugging and throws the error
 * so it can be handled by the framework.
 */
export function validationError(request, h, error) {
  console.log(error.message);

  // re-throw the error so it can be processed by Hapi
  throw error;
}
