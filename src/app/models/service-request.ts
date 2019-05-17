import {BillingAddress} from './billing-address';

export class ServiceRequest {
  id: number;
  data: string;
  serviceType: string;
  customerId: number;
  location: BillingAddress;

  constructor(id: number, data: string, serviceType: string, customerId: number, location: BillingAddress) {
    this.id = id;
    this.data = data;
    this.serviceType = serviceType;
    this.customerId = customerId;
    this.location = location;
  }
}
