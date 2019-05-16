import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {CustomerComponent} from './components/customer/customer.component';
import {NewCustomerComponent} from './components/new-customer/new-customer.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'customer', component: CustomerComponent},
  {path: 'new', component: NewCustomerComponent}
];
export const routing = RouterModule.forRoot(appRoutes);
