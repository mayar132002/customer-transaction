import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: any[] = [];
  filteredCustomers: any[] = [];
  filter: string = '';
  newCustomer: any = { name: '' };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getCustomers().subscribe(data => {
      this.customers = data;
      this.filteredCustomers = data;
    });
  }

  onFilterChange(): void {
    this.filteredCustomers = this.customers.filter(customer => customer.name.toLowerCase().includes(this.filter.toLowerCase()));
  }
}
