import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import {AppNotification} from '../../models/notification.models';

@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {
  notification: AppNotification | null= null;

  constructor(private notificationService: NotificationService){}

  ngOnInit(): void {
    this.notificationService.notification$.subscribe(n => {
      this.notification = n;
    });
  }
}
