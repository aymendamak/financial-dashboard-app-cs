import { Component, computed, inject, OnInit } from '@angular/core';
import { MyCardComponent } from '../my-card/my-card.component';
import { MyTableComponent } from '../my-table/my-table.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './my-dashboard.component.html',
  imports: [MyCardComponent, MyTableComponent, CommonModule, ModalComponent],
})
export class DashboardComponent {
  transactionService = inject(TransactionService);
  transactions = this.transactionService.transactions;

  financialMetrics = [
    { title: 'Net Worth', value: '$25,000', icon: 'account_balance' },
    { title: 'Budget Left', value: '$500', icon: 'pie_chart' },
    { title: 'Cash Flow', value: '+$1,200', icon: 'trending_up' },
  ];

  constructor() {}

  ngOnInit(): void {
    this.transactionService.getAllTransactions();
    console.log('transactions', this.transactions);
  }
}
