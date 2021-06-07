import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierComponent } from './notifier.component';


@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackBar: MatSnackBar) { }

  showNotification(displayMessage: string, buttonText: string, messageType: 'error' | 'success') {
    this.snackBar.openFromComponent(NotifierComponent, {
      data: {
        message: displayMessage,
        buttonText: buttonText,
        type: messageType
      },
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: messageType
    });
  }

  info(displayMessage: string) {
    this.snackBar.open(displayMessage,null, {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}