// my-table.component.ts
import {
  Component,
  computed,
  inject,
  Input,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { MatButtonModule } from '@angular/material/button';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../modal/modal.component';
import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../services/transaction.service';

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
  ],
})
export class MyTableComponent {
  @Input() transactions!: Signal<Transaction[]>;
  private transactionService = inject(TransactionService);

  selectedCategory = signal<string>('');
  selectedType = signal<string>('');

  uniqueCategories = computed(() =>
    Array.from(new Set(this.transactions().map((t) => t.category)))
  );

  filteredTransactions = computed(() => {
    const allTransactions = this.transactions();
    const categoryFilter = this.selectedCategory();
    const typeFilter = this.selectedType();

    return allTransactions.filter((transaction) => {
      const matchesCategory =
        !categoryFilter || transaction.category === categoryFilter;
      const matchesType = !typeFilter || transaction.type === typeFilter;
      return matchesCategory && matchesType;
    });
  });

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

  constructor(private modalService: ModalService) {}

  // Methods to update filters
  filterByCategory(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedCategory.set(value);
  }

  filterByType(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedType.set(value);
  }

  openModal() {
    this.modalService.openModal('create_transaction_modal');
  }

  openTransactionModal(transaction: Transaction) {
    this.modalService.openModal('details_transaction_modal');
    this.transactionService.setCurrentTransaction(transaction);
  }
}
