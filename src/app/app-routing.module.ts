import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionCustomerComponent } from './Components/transaction-customer/transaction-customer.component';
import { CustomerListComponent } from './Components/customer-list/customer-list.component';
import { HomeComponent } from './Components/home/home.component';
import { CustomerTransactionComponent } from './Components/customer-transaction/customer-transaction.component';
import { ChartComponent } from './Components/chart/chart.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},

  {path:'customers',component:HomeComponent},
  {path:'transactions',component:CustomerTransactionComponent},
  {path:'chart',component:ChartComponent}


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
