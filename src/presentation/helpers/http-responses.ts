import { HttpResponse } from "../types/htpp-response";

export const badRequest = (error: Error): HttpResponse => ({
  status: 400,
  body: error,
});

export const forbidden = (error: Error): HttpResponse => ({
  status: 403,
  body: error,
});

export const unauthorized = (error: Error): HttpResponse => ({
  status: 401,
  body: error,
});

export const serverError = (error: Error): HttpResponse => ({
  status: 500,
  body: error,
});

export const ok = (data: any): HttpResponse => ({
  status: 200,
  body: data,
});

export const noContent = (): HttpResponse => ({
  status: 204,
  body: null,
});
