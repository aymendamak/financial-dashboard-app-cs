import { computed, inject, Injectable, signal } from '@angular/core';
import { Transaction, TransactionCreateError } from '../models/transaction';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/v1/transaction';

  private transactionSignal = signal<Transaction[]>([]);
  public transactions = this.transactionSignal.asReadonly();

  private errorSignal = signal<any>([]);
  public errors = this.errorSignal.asReadonly();

  // Computed signal to extract errors
  // public errorMessages = computed(() => this.errorSignal().errors);

  uniqueCategories = ['Food', 'Transport', 'Health', 'Entertainment'];

  constructor() {}

  getUniqueCategories(): string[] {
    return this.uniqueCategories;
  }

  getAllTransactions(): void {
    this.http.get(this.baseUrl + '/all').subscribe({
      next: (data: any) => {
        this.transactionSignal.set(data);
        console.log('transactions', this.transactions());
      },
      error: (error) => {
        this.errorSignal.set(error);
        this.transactionSignal.set([]);
        console.error(error);
      },
    });
  }

  clearError() {
    this.errorSignal.set(null);
  }

  addTransaction(transaction: Transaction) {
    const newTransaction = transaction;
    this.transactionSignal.update((transactions) => [
      ...transactions,
      transaction,
    ]);
    return this.http
      .post<{ data: Transaction }>(this.baseUrl + '/create', newTransaction)
      .pipe(
        tap({
          next: (response) => {
            this.transactionSignal.update((transactions) => [
              ...transactions,
              response.data,
            ]);
          },
          error: (error) => {
            this.errorSignal.set(error.error.errors);
            console.log('Error adding new Transaction', this.errorSignal());
          },
        })
      );
  }
}
