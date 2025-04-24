import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Output() sidebarToggle = new EventEmitter<boolean>();

  toggleSidebar: boolean = false;

  onButtonClick() {
    this.toggleSidebar = !this.toggleSidebar;
    this.sidebarToggle.emit(this.toggleSidebar);
  }

  onLogin() {
    window.location.href = 'https://www.example.com/login';
  }

  onLogout() {
    sessionStorage.removeItem("auth_token");
    sessionStorage.clear();
    window.location.href = 'https://www.example.com/login';
  }

  checkLogin() {
    if (sessionStorage.getItem("auth_token")) {
      return true;
    }

    return false;
  }
}
