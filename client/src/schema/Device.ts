import { BILLINGCYCLE, DEVICESTATUS, DOWNLOADSTATUS } from "./enums";

export interface DeviceLocation {
  city?: string;
  state?: string;
  country?: string;
}

export interface Device {
  id: string;
  serialNo?: string;
  theatreName?: string;
  location?: DeviceLocation;
  ispPaymentResponsibility?: string;
  bandwidth?: string;
  avgBandwidth?: string;
  planStartDate?: string;
  billingCycle?: BILLINGCYCLE | string;
  deviceStatus?: DEVICESTATUS | string;
  downloadStatus?: DOWNLOADSTATUS | string;
  osVersion?: string;
  storage?: string;
}
