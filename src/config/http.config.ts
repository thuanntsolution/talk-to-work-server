const httpConfig = () => ({
  // Success response
  OK: 200,
  CREACTED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // Client error response
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDEN: 403,
  NOT_FOUND: 404,
  HTTP_NOT_ALLOWED: 405,
  CONFIG: 409,
  UNPROCESSABLE_ENTITY: 429,
  TOO_MANY_REQUEST: 429,

  // Server error response
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENT: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
})

export const HTTPSTATUS = httpConfig()

export type HttpStatusCode = (typeof HTTPSTATUS)[keyof typeof HTTPSTATUS]
