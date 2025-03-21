import { Component } from '@angular/core';
import { MyCardComponent } from '../my-card/my-card.component';
import { MyTableComponent } from '../my-table/my-table.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

interface Transaction {
  id: number;
  date: Date;
  description: string;
  amount: number;
  category: string;
  type: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './my-dashboard.component.html',
  imports: [MyCardComponent, MyTableComponent, CommonModule, ModalComponent],
})
export class DashboardComponent {
  financialMetrics = [
    { title: 'Net Worth', value: '$25,000', icon: 'account_balance' },
    { title: 'Budget Left', value: '$500', icon: 'pie_chart' },
    { title: 'Cash Flow', value: '+$1,200', icon: 'trending_up' },
  ];

  transactions: Transaction[] = [
    {
      id: 1,
      date: new Date('2025-03-20'),
      description: 'Grocery shopping',
      amount: -85.5,
      category: 'Food',
      type: 'Expense',
    },
    {
      id: 2,
      date: new Date('2025-03-19'),
      description: 'Salary deposit',
      amount: 3000,
      category: 'Income',
      type: 'Income',
    },
    {
      id: 3,
      date: new Date('2025-03-18'),
      description: 'Rent payment',
      amount: -1200,
      category: 'Housing',
      type: 'Expense',
    },
    {
      id: 4,
      date: new Date('2025-03-17'),
      description: 'Dinner at restaurant',
      amount: -50,
      category: 'Food',
      type: 'Expense',
    },
    {
      id: 5,
      date: new Date('2025-03-16'),
      description: 'Car insurance',
      amount: -150,
      category: 'Insurance',
      type: 'Expense',
    },
    {
      id: 6,
      date: new Date('2025-03-15'),
      description: 'Investment dividend',
      amount: 200,
      category: 'Investments',
      type: 'Income',
    },
    {
      id: 7,
      date: new Date('2025-03-14'),
      description: 'Utility bill',
      amount: -100,
      category: 'Utilities',
      type: 'Expense',
    },
    {
      id: 8,
      date: new Date('2025-03-13'),
      description: 'Credit card payment',
      amount: -500,
      category: 'Debt Repayment',
      type: 'Expense',
    },
    {
      id: 9,
      date: new Date('2025-03-12'),
      description: 'Subscription renewal',
      amount: -20,
      category: 'Subscriptions',
      type: 'Expense',
    },
    {
      id: 10,
      date: new Date('2025-03-11'),
      description: 'Savings deposit',
      amount: 500,
      category: 'Savings',
      type: 'Income',
    },
  ];
}
