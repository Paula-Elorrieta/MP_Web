import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Notifikazio } from '../../interfaces/notifikazio';
import { QueryService } from '../../services/query.service';

@Component({
  selector: 'app-notifikazio',
  imports: [CommonModule],
  templateUrl: './notifikazio.component.html',
  styleUrl: './notifikazio.component.css',
})
export class NotifikazioComponent {
  notifikazioak: Notifikazio[] = [];
  saltzaileak: any[] = [];
  liburuak: any[] = [];
  constructor(
    private queryService: QueryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.queryService.getUsers().subscribe((response) => {
      this.saltzaileak = response.users;
      console.log(this.saltzaileak);
    });

    this.queryService.getLiburuak().subscribe((response) => {
      this.liburuak = response.liburuak;
      console.log(this.liburuak);
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.queryService.getNotifikazioak(id).subscribe((response) => {
        this.notifikazioak = response.notifikazioak;
        console.log(this.notifikazioak);

        for (let i = 0; i < this.notifikazioak.length; i++) {
          for (let j = 0; j < this.saltzaileak.length; j++) {
            console.log(this.notifikazioak[i].saltzailea_id);
            if (
              this.notifikazioak[i].saltzailea_id ===
              this.saltzaileak[j].user_id
            ) {
              this.notifikazioak[i].saltzaile_izena =
                this.saltzaileak[j].izena_abizena;
              this.notifikazioak[i].saltzaile_email = this.saltzaileak[j].email;
              this.notifikazioak[i].saltzaile_telefonoa =
                this.saltzaileak[j].telefonoa;
              this.notifikazioak[i].saltzaile_helbidea =
                this.saltzaileak[j].helbidea;
              break;
            }
          }
          for (let k = 0; k < this.liburuak.length; k++) {
            if (
              this.notifikazioak[i].liburu_id === this.liburuak[k].liburu_id
            ) {
              this.notifikazioak[i].liburua_izena = this.liburuak[k].tituloa;
              break;
            }
          }
        }
      });
    }
  }

  onartuEskaria(notifikazioa: any) {
    this.queryService
      .onartuEskaera(
        notifikazioa.id,
        notifikazioa.liburu_id,
        notifikazioa.saltzaile_id
      )
      .subscribe({
        next: (res) => {
          console.log(res.message);
          window.location.reload();
        },
        error: (err) => console.error(err),
      });
    alert('Eskaera onartu da. Saltzaileari jakinaraziko zaio.');
  }

  ukatuEskaria(notifikazioa: any) {
    this.queryService.ukatuEskaera(notifikazioa.notifikazioa_id).subscribe({
      next: (res) => {
        console.log(res.message);
        window.location.reload();
      },
      error: (err) => console.error(err),
    });
    alert('Eskaera ukatu da. Saltzaileari jakinaraziko zaio.');
  }
}
