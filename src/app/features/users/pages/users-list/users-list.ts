import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../../shared/services/users.service';
import { User } from '../../../../shared/models/user.model';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './users-list.html',
  styleUrls: ['./users-list.scss'],
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: string | null = null;

  constructor(private usersService: UsersService, private snack: MatSnackBar) {}

  ngOnInit(): void {
    const nav = history.state;

    if (nav.newUser) {
      this.users.unshift(nav.newUser);
    } else {
      this.fetchUsers();
    }
  }

  fetchUsers() {
    this.loading = true;
    this.error = null;
    this.usersService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message || 'Error cargando usuarios';
        this.loading = false;
        this.snack.open(this.error ?? 'Error desconocido', 'Cerrar', {
          duration: 4000,
        });
      },
    });
  }
}
