import { AuthenticatedUserDTO } from "../../application/dtos/authenticated-user-dto";

export type HttpRequest = {
  body: any;
  query?: any;
  params?: any;
  headers?: { [key: string]: string };
  user?: AuthenticatedUserDTO;
  currentUser?: AuthenticatedUserDTO;
};
