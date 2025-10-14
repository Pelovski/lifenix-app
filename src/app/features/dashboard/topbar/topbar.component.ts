import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-topbar',
  standalone: false,
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {

   dropdownOpen = false;

  @ViewChild('profileMenu') profileMenu!: ElementRef;

  constructor(public authService: AuthService, private router: Router, private notificationService: NotificationService){

  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout(){
    this.authService.logout().subscribe({
      next: () =>{
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.notificationService.show('Something went wrong', 'error');
        console.error('Logout failed', err);
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.profileMenu.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.dropdownOpen = false;
    }
  }
}
