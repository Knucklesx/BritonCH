import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { SuccessModalComponent } from '../success-modal/success-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private dialog: MatDialog, private router: Router) {}

  openErrorModal(message: string) {
    this.dialog.open(ErrorModalComponent, {
      data: { entityName: message },
    });
  }

  openSuccessModal(message: string) {
    const dialogRef = this.dialog.open(SuccessModalComponent, {
      data: { entityName: message },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/main']);
    });
  }
}
