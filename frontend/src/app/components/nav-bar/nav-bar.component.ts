import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HizkuntzaSelectComponent } from '../hizkuntza-select/hizkuntza-select.component';
import { BilaketaComponent } from "../bilaketa/bilaketa.component";

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, HizkuntzaSelectComponent, BilaketaComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

}
