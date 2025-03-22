import { Component, inject, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-details-modal',
  imports: [MatIconModule, CommonModule],
  templateUrl: './details-modal.component.html',
})
export class DetailsModalComponent implements OnInit {
  private modalService = inject(ModalService);
  private transactionService = inject(TransactionService);

  transaction = this.transactionService.currentTransaction;

  constructor() {}

  closeModal() {
    this.modalService.closeModal('details_transaction_modal');
    this.transactionService.clearError();
  }

  ngOnInit(): void {}

  deleteTransaction() {
    this.transactionService.deleteTransaction();
  }
}
