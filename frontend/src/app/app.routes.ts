import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { KomunitateaComponent } from './pages/komunitatea/komunitatea.component';
import { ProfilaComponent } from './pages/profila/profila.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },

  { path: 'auth/register', component: RegisterComponent },
  { path: 'pages/home', component: HomeComponent },

  { path: 'pages/komunitatea', component: KomunitateaComponent },
  { path: 'pages/profile', component: ProfilaComponent },

];
