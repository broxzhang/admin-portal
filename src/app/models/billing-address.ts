export class BillingAddress {
   street: string;
   city: string;
  province: string;
  country: string;

  constructor(street: string, city: string, province: string, country: string) {
    this.street = street;
    this.city = city;
    this.province = province;
    this.country = country;
  }
}
