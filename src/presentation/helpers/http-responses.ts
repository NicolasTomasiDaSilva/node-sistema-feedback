import { HttpResponse } from "../types/htpp-response";

export const ok = (data: any): HttpResponse => ({
  status: 200,
  body: data,
});

export const created = (data: any): HttpResponse => ({
  status: 201,
  body: data,
});

export const notFound = (error: any): HttpResponse => ({
  status: 404,
  body: {
    error: error?.name,
    message: error?.message,
  },
});

export const noContent = (): HttpResponse => ({
  status: 204,
  body: null,
});

export const badRequest = (error: any): HttpResponse => ({
  status: 400,
  body: {
    error: error?.name,
    message: error?.message,
    details: error?.details ?? undefined,
  },
});

export const unauthorized = (error: any): HttpResponse => ({
  status: 401,
  body: {
    error: error?.name,
    message: error?.message,
  },
});

export const forbidden = (error: any): HttpResponse => ({
  status: 403,
  body: {
    error: error?.name,
    message: error?.message,
  },
});

export const serverError = (error: any): HttpResponse => ({
  status: 500,
  body: {
    error: "Internal Server Error",
    message: error?.message ?? "Something went wrong",
  },
});
