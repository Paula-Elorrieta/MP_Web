import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { SalmentaComponent } from "../../components/salmenta/salmenta.component";

@Component({
  selector: 'app-home',
  imports: [NavBarComponent, SalmentaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  userLog: User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;

  constructor() { }

  ngOnInit() {
    console.log('Usuario logueado:', this.userLog);
  }

}
