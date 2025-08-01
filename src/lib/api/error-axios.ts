import { AuthError, NotFoundError, ServerError, UnknownApiError, ValidationError } from "./error";

/**
 * Handles any API error and throws a custom typed error.
 * @param error the original error thrown from axios
 * @param context optional context string to describe where the error occurred
 */
export function handleAxiosError(error: unknown, context: string): never {
  if (typeof error === "object" && error !== null && "response" in error) {
    const err = error as { response?: { status?: number; data?: { message?: string } } };
    const status = err.response?.status;
    const message = err.response?.data?.message || "An error occurred.";

    switch (status) {
      case 400:
      case 409:
        throw new ValidationError(`Validation error during ${context}: ${message}`);
      case 401:
      case 403:
        throw new AuthError(`Auth error during ${context}: ${message}`);
      case 404:
        throw new NotFoundError(`Not found during ${context}: ${message}`);
      case 500:
        throw new ServerError(`Server error during ${context}: ${message}`);
      default:
        throw new UnknownApiError(`API error during ${context}: ${message}`);
    }
  }

  throw new UnknownApiError(`Unexpected error during ${context}`);
}
