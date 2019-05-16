import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {CostumerService} from '../../services/costumer.service';
import {Customer} from '../../models/customer';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BillingAddress} from '../../models/billing-address';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  userId;
  editMode = false;
  firstName;
  lastName;
  email;
  phoneNumber;
  company;
  street;
  city;
  province;
  country;
  notes;
  private customer: Customer;
  updatedCustomer: Customer;
  updatedAddress: BillingAddress;
  constructor(
    private router: Router,
  private customerService: CostumerService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) =>{
      this.userId = params['id'];
      console.log(this.userId);
    });
    this.customerService.getCustomerById(Number(this.userId)).subscribe(
      data =>{
        console.log(data);
        this.customer = data;
      }
    );
  }
  editModeOn() {
    this.editMode = true;
  }
  saveCustomer() {
    this.updatedAddress = new BillingAddress(
      this.street.value,
      this.city.value,
      this.province.value,
      this.country.value);
    this.updatedCustomer = new Customer(
      999, '',
      this.firstName.value,
      this.lastName.value,
      this.company.value,
      this.email.value,
      this.phoneNumber.value,
      this.updatedAddress,
      this.notes.value
    );
    this.customerService.modifyCustomer(this.userId, this.updatedCustomer);
    this.editMode = false;
  }
  deleteCustomer(){
    this.customerService.deleteCustomer(this.userId);
    this.router.navigate(['']);
  }
}
