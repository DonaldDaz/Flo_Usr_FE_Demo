import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../shared/user.service';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TableComponent implements OnInit {
  users: User[] = [];
  loading = false;
  formUser: Partial<User> = {};
  searchTerm: string = '';
  editMode: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Errore nel recupero utenti', err);
        this.loading = false;
      }
    });
  }

  searchUsers(): void {
    if (this.searchTerm.trim() === '') {
      this.fetchUsers(); // If the input is empty, fetch all users
      return;
    }

    // Split the input into parts
    const parts = this.searchTerm.trim().split(' ');
    let firstName = '';
    let lastName = '';

    if (parts.length === 1) {
      // If there's only one word, treat it as the last name
      lastName = parts[0];
    } else {
      // If there are multiple words, the first part is the first name, and the rest is the last name
      firstName = parts[0];
      lastName = parts.slice(1).join(' ');
    }

    this.loading = true;
    this.userService.search(firstName, lastName).subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error while searching users', err);
        this.loading = false;
      }
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== id);
      },
      error: (err) => {
        console.error('Errore nella cancellazione utente', err);
      }
    });
  }

  submitForm(): void {
    if (this.editMode) {    
      const firstName = this.formUser.firstName?.trim() || '';
      const lastName = this.formUser.lastName?.trim() || '';
  
      if (!firstName || !lastName) {
        console.error('Nome e cognome sono obbligatori per cercare l\'utente.');
        return;
      }
  
      this.userService.search(firstName, lastName).subscribe({
        next: (results: User[]) => {
          if (results.length > 1) {
            alert('Trovati più utenti con lo stesso nome e cognome.');
            return;
          }
          const foundUser = results[0];
          if (foundUser && foundUser.id !== undefined) {
            this.userService.updateUser(foundUser.id, this.formUser as User).subscribe({
              next: () => {
                this.fetchUsers();
                this.resetForm();
              },
              error: (err) => console.error('Errore aggiornamento', err)
            });
          } else {
            console.error('Utente trovato ma id mancante. Update impossibile.');
          }
        },
        error: (err) => {
          console.error('Errore nella ricerca utente:', err);
        }
      });
  
    } else {
      this.userService.createUser(this.formUser as User).subscribe({
        next: () => {
          this.fetchUsers();
          this.resetForm();
        },
        error: (err) => console.error('Errore creazione', err)
      });
    }
  }
  


resetForm(): void {
  this.formUser = {};
}


}