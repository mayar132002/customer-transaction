import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Customer } from '../../interfaces/customer.model';
import { Transaction } from '../../interfaces/transaction.model';

@Component({
  selector: 'app-customer-transaction',
  templateUrl: './customer-transaction.component.html',
  styleUrls: ['./customer-transaction.component.css']
})
export class CustomerTransactionComponent implements OnInit {
  customers: Customer[] = [];
  transactions: any[] = []; // Define transactions as any[] to accommodate customer names
  filteredTransactions: any[] = [];
  filter: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getCustomers().subscribe((customerData: Customer[]) => {
      this.customers = customerData;
      this.fetchTransactions();
    });
  }

  fetchTransactions(): void {
    this.dataService.getTransactions().subscribe((transactionData: Transaction[]) => {
      const customerMap: { [key: number]: string } = this.customers.reduce((map, customer) => {
        map[customer.id] = customer.name;
        return map;
      }, {} as { [key: number]: string });

      this.transactions = transactionData.map(transaction => ({
        ...transaction,
        customer_name: customerMap[transaction.customer_id] // Map customer_id to customer_name
      }));

      this.filteredTransactions = this.transactions;
    });
  }

  applyFilters(): void {
    const filterLower = this.filter.toLowerCase();

    this.filteredTransactions = this.transactions.filter(transaction => {
      const matchesName = transaction.customer_name.toLowerCase().includes(filterLower);
      const matchesAmount = transaction.amount.toString().includes(this.filter);
      return matchesName || matchesAmount;
    });
  }
}
