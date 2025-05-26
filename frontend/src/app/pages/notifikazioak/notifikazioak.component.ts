import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { NotifikazioComponent } from "../../components/notifikazio/notifikazio.component";

@Component({
  selector: 'app-notifikazioak',
  imports: [NavBarComponent, CommonModule, NotifikazioComponent],
  templateUrl: './notifikazioak.component.html',
  styleUrl: './notifikazioak.component.css',
})
export class NotifikazioakComponent {}
