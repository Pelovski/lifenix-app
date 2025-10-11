import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notification } from '../models/notification.models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<Notification | null>(null);
  notification$ = this.notificationSubject.asObservable();
  
  show(message: string, type: Notification['type'] = 'info') {
    this.notificationSubject.next({ message, type });
    setTimeout(() => this.clear(), 3000);
  }

  clear() {
    this.notificationSubject.next(null);
  }
}
