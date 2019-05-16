import {BillingAddress} from './billing-address';

export class Customer {
   id: number;
   picture: string;
   firstName: string;
   lastName: string;
   company: string;
   email: string;
   phoneNumber: string;
  billingAddress: BillingAddress;
   notes: string;

  constructor(id: number, picture: string, firstName: string, lastName: string, company: string, email: string, phoneNumber: string, billingAddress: BillingAddress, notes: string) {
    this.id = id;
    this.picture = picture;
    this.firstName = firstName;
    this.lastName = lastName;
    this.company = company;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.billingAddress = billingAddress;
    this.notes = notes;
  }
}

