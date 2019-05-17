import { Component, OnInit } from '@angular/core';
import {CostumerService} from '../../services/costumer.service';
import {Customer} from '../../models/customer';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BillingAddress} from '../../models/billing-address';
import {ServiceRequestService} from '../../services/service-request.service';
import {ServiceRequest} from '../../models/service-request';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
  userRequests: ServiceRequest[] = [];
  hasRequests = false;
  openAddRequest = false;
  newRequest: ServiceRequest;
  addNewRequestForm: FormGroup;
  serviceDate = new FormControl('', [Validators.required]);
  serviceType = new FormControl('', [Validators.required]);
  locationStreet = new  FormControl('', [Validators.required]);
  locationCity = new FormControl('', [Validators.required]);
  locationProvince = new FormControl('', [Validators.required]);
  locationCountry = new FormControl('', [Validators.required]);
  constructor(
    private router: Router,
    private customerService: CostumerService,
    private requestService: ServiceRequestService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.addNewRequestForm = new FormGroup({
      serviceDate: this.serviceDate,
      serviceType: this.serviceType,
      locationStreet: this.locationStreet,
      locationCity: this.locationCity,
      locationProvince: this.locationProvince,
      locationCountry: this.locationCountry,
    })
    this.route.queryParams.subscribe((params: Params) => {
      this.userId = params['id'];
      console.log(this.userId);
    });
    this.customerService.getCustomerById(Number(this.userId)).subscribe(
      data =>  {
        console.log(data);
        this.customer = data;
      }
    );
    this.requestService.getCustomerServiceByCustomer(this.userId).subscribe(
      data => {
        this.userRequests = data;
        if (this.userRequests.length !== 0){
          this.hasRequests = true;
        }
        console.log(data);
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
  deleteCustomer() {
    this.customerService.deleteCustomer(this.userId);
    this.router.navigate(['']);
  }
  openAdd(){
    this.openAddRequest = !this.openAddRequest;
  }
  addNewRequest() {
    const location = new BillingAddress(this.locationStreet.value, this.locationCity.value, this.locationProvince.value, this.locationCountry.value);
    this.newRequest = new ServiceRequest(
      999,
      new Date(this.serviceDate.value).toUTCString(),
      this.serviceType.value,
      this.userId,
      location
    );
    this.requestService.addNewRequest(this.newRequest);
    this.router.navigate(['customer'],{ queryParams: {id: this.userId}});
  }
}
