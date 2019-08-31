import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private snackbar: MatSnackBar) { }

  alert(message: string, action: string = 'Hide') {
    return this.snackbar.open(message, action, {
      duration: 2500
    });
  }
}
