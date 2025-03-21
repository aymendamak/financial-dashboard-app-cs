// my-table.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { MatButtonModule } from '@angular/material/button';
import { ModalService } from '../../services/modal.service';
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
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  imports: [
    CommonModule,
    MatIcon,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ModalComponent,
  ],
})
export class MyTableComponent {
  @Input() transactions: Transaction[] = [];
  displayedColumns: string[] = [
    'Date',
    'Description',
    'Amount',
    'Category',
    'Type',
    'Actions',
  ];

  filters = {
    description: '',
    category: '',
    type: '',
  };

  filteredTransactions: Transaction[] = [];
  uniqueCategories: string[] = [];

  constructor(private modalService: ModalService) {}

  openModal() {
    this.modalService.openModal('create_transaction_modal');
  }

  filterTransactions(transactions: Transaction[], filters: any): Transaction[] {
    console.log('Filtering transactions with filters', filters);
    return transactions.filter((transaction) => {
      return (
        (!filters.description ||
          transaction.description
            .toLowerCase()
            .includes(filters.description.toLowerCase())) &&
        (!filters.category || transaction.category === filters.category) &&
        (!filters.type || transaction.type === filters.type)
      );
    });
  }

  ngOnInit() {
    this.filteredTransactions = [...this.transactions];
    this.uniqueCategories = [
      ...new Set(this.transactions.map((t) => t.category)),
    ];
  }

  applyFilters() {
    this.filteredTransactions = this.filterTransactions(
      this.transactions,
      this.filters
    );
  }

  filterByType(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    this.filters.type = value;
    this.applyFilters();
  }

  filterByCategory(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedCategory = selectElement.value;
    this.filters.category = selectedCategory;
    this.applyFilters();
  }

  openTransactionModal(transaction: Transaction) {
    console.log('Open modal for transaction', transaction);
    // Implement logic to open a modal with transaction details
  }
}
