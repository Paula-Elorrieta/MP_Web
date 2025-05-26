import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Liburua } from '../../interfaces/liburua';
import { QueryService } from '../../services/query.service';
import { ImagePathPipe } from '../../pipes/image-path.pipe';

@Component({
  selector: 'app-salmenta',
  imports: [CommonModule, ImagePathPipe],
  templateUrl: './salmenta.component.html',
  styleUrl: './salmenta.component.css',
})
export class SalmentaComponent {
  liburuak: Liburua[] = [];
  saltzaileak: any[] = [];
  saltzailea: any = {
    izena_abizena: '',
    email: '',
    pasahitza: '',
    erabiltzailea: '',
  };

  constructor(private queryService: QueryService, private router: Router) {}
  ngOnInit() {
    this.queryService.getUsers().subscribe((response) => {
      this.saltzaileak = response.users;
      console.log(this.saltzaileak);
    });

    this.queryService.getLiburuak().subscribe((response) => {
      this.liburuak = response.liburuak;
      console.log(this.liburuak);

      this.liburuak.forEach((liburua) => {
        for (let i = 0; i < this.saltzaileak.length; i++) {
          if (liburua.user_id === this.saltzaileak[i].user_id) {
            this.saltzailea = this.saltzaileak[i];
            liburua.saltzaile_izena = this.saltzailea.izena_abizena;
            break;
          }
        }
      });
    });
  }

  ikusiXehetasunak(id: number) {
    this.router.navigate(['/salmenta', id]);
  }
}
