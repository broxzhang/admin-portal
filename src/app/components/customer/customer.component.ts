import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {CostumerService} from '../../services/costumer.service';
import {Customer} from '../../models/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  private customer: Customer;
  constructor(
    private customerService: CostumerService
  ) { }

  ngOnInit() {
    this.customerService.getCustomerById(1).subscribe(
      data =>{
        console.log(data);
        this.customer = data;
      }
    );
  }

}
