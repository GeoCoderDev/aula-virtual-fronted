import { Alerts } from "./Alerts";

export interface ErrorAPI {
  message: string;
  alerts?: Alerts;
}

export interface SuccessMessageAPI {
  message: string;
  alerts?: Alerts;
  Id?: number;
  Id2?: number;
}
