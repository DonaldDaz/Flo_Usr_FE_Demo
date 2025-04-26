import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  // Event emitter to notify parent component about sidebar toggle
  // This will emit a boolean value indicating whether the sidebar is open or closed
  // The parent component can subscribe to this event to perform actions based on the sidebar state
  // The event is intercepted in app.component.html
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
