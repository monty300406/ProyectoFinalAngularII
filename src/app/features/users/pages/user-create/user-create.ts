import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { UsersService } from '../../../../shared/services/users.service';
import { CreateUserDto } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './user-create.html',
  styleUrls: ['./user-create.scss'],
})
export class UserCreateComponent implements OnInit {
  form!: FormGroup; 
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      website: [''],
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.isSubmitting = true;
    const dto: CreateUserDto = this.form.value as CreateUserDto;

    this.usersService.createUser(dto).subscribe({
      next: (res) => {
        this.snack.open(`Usuario creado (id: ${res.id})`, 'Cerrar', {
          duration: 3000,
        });

        this.router.navigate(['/users'], { state: { newUser: res } });
      },
      error: () => {
        this.snack.open('Error al crear usuario', 'Cerrar', { duration: 3000 });
        this.isSubmitting = false;
      },
    });
  }
}
