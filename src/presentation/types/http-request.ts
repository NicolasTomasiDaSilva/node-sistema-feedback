import { TokenPayloadDTO } from "../../application/dtos/token-payload-dto";

export type HttpRequest = {
  body: any;
  headers?: { [key: string]: string };
  user?: TokenPayloadDTO;
};
