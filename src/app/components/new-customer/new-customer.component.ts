import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../../models/customer';
import {BillingAddress} from '../../models/billing-address';
import {CostumerService} from '../../services/costumer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent implements OnInit {
  addNewForm: FormGroup;
  id = new FormControl('', [Validators.required])
  firstName = new FormControl('', [Validators.required])
  lastName = new FormControl('', [Validators.required])
  email = new FormControl('', [Validators.required])
  phoneNumber = new FormControl('', [Validators.required])
  company = new FormControl('', [Validators.required])
  street = new FormControl('', [Validators.required])
  city = new FormControl('', [Validators.required])
  province = new FormControl('', [Validators.required])
  country = new FormControl('', [Validators.required])
  notes = new FormControl('', [Validators.required])
  newCustomer: Customer;
  newAddress: BillingAddress;
  constructor(
    private customerService: CostumerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.addNewForm = new FormGroup({
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      company: this.company,
      street: this.street,
      city: this.city,
      province: this.province,
      country: this.country,
      notes: this.notes
    });
  }
  addNew() {
    this.newAddress = new BillingAddress(
      this.street.value,
      this.city.value,
      this.province.value,
      this.country.value);
    this.newCustomer = new Customer(
      999, '',
      this.firstName.value,
      this.lastName.value,
      this.company.value,
      this.email.value,
      this.phoneNumber.value,
      this.newAddress,
      this.notes.value
    );
    // console.log(this.customerService.addNewCustomer(this.newCustomer));
    // console.log(this.customerService.checkId(Number(this.id.value)));
    // console.log(this.newCustomer);
    this.customerService.addNewCustomer(this.newCustomer);
    this.router.navigate(['']);
  }
}
