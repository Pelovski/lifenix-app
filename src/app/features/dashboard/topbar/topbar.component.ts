import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-topbar',
  standalone: false,
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {

   dropdownOpen = false;

  @ViewChild('profileMenu') profileMenu!: ElementRef;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Затваряне при клик извън менюто
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.profileMenu.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.dropdownOpen = false;
    }
  }
}
