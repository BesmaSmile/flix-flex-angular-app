// src/app/services/notification.service.ts

import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) { }

  showError(title = 'Error', message = 'An error occurred') {
    this.toastr.error(message, title, {
      positionClass: 'toast-bottom-right',
      closeButton: true,
    });
  }

  showSuccess(title = 'Success', message = 'Operation successful') {
    this.toastr.success(message, title, {
      positionClass: 'toast-bottom-right',
      closeButton: true,
    });
  }

  showInfo(title = 'Info', message: string) {
    this.toastr.info(message, title, {
      positionClass: 'toast-bottom-right',
      closeButton: true,
    });
  }

  showWarning(title = 'Warning', message: string,) {
    this.toastr.warning(message, title, {
      positionClass: 'toast-bottom-right',
      closeButton: true,
    });
  }
}
