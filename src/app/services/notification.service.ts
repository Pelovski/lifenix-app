import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppNotification } from '../models/notification.models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<AppNotification | null>(null);
  notification$ = this.notificationSubject.asObservable();

  show(message: string, type: AppNotification['type'] = 'info') {
    this.notificationSubject.next({ message, type });
    setTimeout(() => this.clear(), 7000);
  }

  clear() {
    this.notificationSubject.next(null);
  }
}
