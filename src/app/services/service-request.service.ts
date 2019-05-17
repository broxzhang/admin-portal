import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ServiceRequest} from '../models/service-request';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {
  url = 'http://localhost:3000/serviceRequests';
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(
    private http: HttpClient
  ) { }
  getCustomerServiceByCustomer(id: number): Observable<ServiceRequest[]>{
    console.log(this.http.get<ServiceRequest[]>(this.url + '?customerId=' + id));
    return this.http.get<ServiceRequest[]>(this.url + '?customerId=' + id);
}
addNewRequest(newRequest: ServiceRequest) {
    const postBody = {
    'date': newRequest.data,
    'serviceType': newRequest.serviceType,
    'customerId': Number(newRequest.customerId),
    'location': {
      'street': newRequest.location.street,
      'city': newRequest.location.city,
      'province': newRequest.location.province,
      'country': newRequest.location.country
    }
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
}
