import { HttpResponse } from "../types/htpp-response";

export const ok = (data: any): HttpResponse => ({
  status: 200,
  body: data,
});

export const created = (data: any): HttpResponse => ({
  status: 201,
  body: data,
});

export const noContent = (): HttpResponse => ({
  status: 204,
  body: null,
});

export const badRequest = (error: any): HttpResponse => ({
  status: 400,
  body: {
    error: "Bad Request",
    message: error?.message ?? error,
    details: error?.details ?? undefined,
  },
});

export const unauthorized = (error: any = "Unauthorized"): HttpResponse => ({
  status: 401,
  body: {
    error: "Unauthorized",
    message: error?.message ?? error,
  },
});

export const forbidden = (error: any): HttpResponse => ({
  status: 403,
  body: {
    error: "Forbidden",
    message: error?.message ?? error,
  },
});

export const serverError = (error: any): HttpResponse => ({
  status: 500,
  body: {
    error: "Internal Server Error",
    message: error?.message ?? "Something went wrong",
  },
});
