export type Alerts = Alert[];

export type AlertTypes = "critical" | "advertency" | "informative" | "success";

export interface Alert {
  type: AlertTypes;
  content: string;
}
