import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {filter, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Customer} from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CostumerService {
  url = 'http://localhost:3000/customers';
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(
    private http: HttpClient
  ) {
  }
  fetchCustomers() {
    const res = this.http.get('http://localhost:3000/customers');
    res.pipe(
      map(
        (req) => {
          return req;
        }
      )
    ).subscribe(
      (data) => {
        console.log(data);
        return data;
      }
    );
    return res;
  }
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.url);
  }
  checkId(id: number): boolean {
    return this.getCustomerById(id) !== null;
  }
  getCustomerById(id: number): Observable<Customer> {
    const putUrl = this.url + '/' + String(id);
    return this.http.get<Customer>(putUrl);
  }
  addNewCustomer(newCustomer: Customer) {
    const postBody = {
      'picture': 'http://placehold.it/32x32',
      'firstName': newCustomer.firstName,
      'lastName': newCustomer.lastName,
     'company' : newCustomer.company,
      'email': newCustomer.email,
      'phoneNumber': newCustomer.phoneNumber,
      'billingAddress': {
        'street': newCustomer.billingAddress.street,
        'city': newCustomer.billingAddress.city,
        'province': newCustomer.billingAddress.province,
        'country': newCustomer.billingAddress.country
      },
      'notes': newCustomer.notes
    };
    this.http.post(this.url, postBody, {headers: this.headers})
      .subscribe(
        (res) => {
          return res;
        },
        (error) => {
          console.log(error);
        });
  }
  modifyCustomer(id: number, customer: Customer) {
    const postBody = {
      'picture': 'http://placehold.it/32x32',
      'firstName': customer.firstName,
      'lastName': customer.lastName,
      'company' : customer.company,
      'email': customer.email,
      'phoneNumber': customer.phoneNumber,
      'billingAddress': {
        'street': customer.billingAddress.street,
        'city': customer.billingAddress.city,
        'province': customer.billingAddress.province,
        'country': customer.billingAddress.country
      },
      'notes': customer.notes
    };
    const putUrl = this.url + '/' + String(id);
    this.http.put(putUrl, postBody, {headers: this.headers})
      .subscribe(
        (res) => {
          return res;
        },
        (error) => {
          console.log(error);
        });
  }
  deleteCustomer(id: number) {
    const putUrl = this.url + '/' + String(id);
    this.http.delete(putUrl, {headers: this.headers})
      .subscribe(
        (res) => {
          return res;
        },
        (error) => {
          console.log(error);
        });
  }
}
