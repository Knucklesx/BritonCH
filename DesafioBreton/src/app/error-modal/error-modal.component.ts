import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-modal',
  standalone: true,
  imports: [],
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.css',
})
export class ErrorModalComponent {
  constructor(public dialogRef: MatDialogRef<ErrorModalComponent>) {}

  onClose(): void {
    this.dialogRef.close();
    window.location.reload();
  }
}
