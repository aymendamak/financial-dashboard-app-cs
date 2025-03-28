import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TransactionService } from '../../services/transaction.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'app-modal',
  imports: [MatIconModule, CommonModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {
  uniqueCategories: string[] = [];
  transactionService = inject(TransactionService);
  errorMessages = this.transactionService.errors;

  public createForm!: FormGroup;

  constructor(private modalService: ModalService) {
    this.createForm = new FormGroup({
      category: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  ngOnInit() {
    this.uniqueCategories = this.transactionService.getUniqueCategories();
  }

  onSubmit() {
    if (this.createForm.valid) {
      const formValue = this.createForm.value;
      const newTransaction: Transaction = {
        id: 1,
        category: formValue.category,
        type: formValue.type,
        amount: formValue.amount,
        date: new Date('2025-05-06'),
        description: formValue.description,
      };
      this.transactionService.addTransaction(newTransaction).subscribe({
        next: (response) => {
          this.closeModal();
        },
        error: (error) => {
          console.error('Error creating Transaction:', error);
        },
        complete: () => {
          this.createForm.reset({
            category: 'Food',
            type: 'INCOME',
            amount: '',
            date: '',
            description: '',
          });
        },
      });
    }
  }

  closeModal() {
    this.modalService.closeModal('create_transaction_modal');
    this.transactionService.clearError();
  }
}
