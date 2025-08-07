// utils/response.ts
export function successResponse(message: string, data: any, statusCode = 200) {
  return {
    message,
    data,
    statusCode,
  };
}

export function errorResponse(message: string, error: any, statusCode = 500) {
  return {
    message,
    error,
    statusCode,
  };
}
export function notFoundResponse(message: string, statusCode = 404) {
  return {
    message,
    statusCode,
  };
}

export function badRequestResponse(message: string, statusCode = 400) {
  return {
    message,
    statusCode,
  };
}

export function unauthorizedResponse(message: string, statusCode = 401) {
  return {
    message,
    statusCode,
  };
}

export function forbiddenResponse(message: string, statusCode = 403) {
  return {
    message,
    statusCode,
  };
}

export function createdResponse(message: string, data: any, statusCode = 201) {
  return {
    message,
    data,
    statusCode,
  };
}

export function noContentResponse(message: string, statusCode = 204) {
  return {
    message,
    statusCode,
  };
}