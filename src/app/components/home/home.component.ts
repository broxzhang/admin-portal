import {Component, OnInit, ViewChild} from '@angular/core';
import {CostumerService} from 'src/app/services/costumer.service';
import {Customer} from '../../models/customer';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public customers: Customer[] = [];
  public dataSource: any;
  displayedColumns: string[] = ['id', 'company', 'firstName', 'lastName', 'email', 'phoneNumber'];
  searchId: number ;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private customerService: CostumerService
  ) { }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(
      data =>{
        this.customers = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
      }
    );

  }
  getRecord(row) {
    console.log(row);
  }
  searchCustomer() {
    console.log(this.searchId);
    this.customerService.getCustomerById(this.searchId).subscribe(
      (data) => {
        let c: Customer[] = [];
        c.push(data);
        this.dataSource = new MatTableDataSource(c);
        console.log(this.dataSource);
      }
    );
  }

}
