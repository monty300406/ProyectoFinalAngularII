import { Routes } from '@angular/router';
import { UsersListComponent } from './features/users/pages/users-list/users-list';
import { UserCreateComponent } from './features/users/pages/user-create/user-create';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersListComponent },
  { path: 'users/create', component: UserCreateComponent },
  { path: '**', redirectTo: 'users' },
];
