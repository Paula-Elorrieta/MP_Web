import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/user';
import { ImagePathPipe } from '../../pipes/image-path.pipe';
import { QueryService } from '../../services/query.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-salmeta-orria',
  imports: [NavBarComponent, CommonModule, ImagePathPipe, FormsModule],
  templateUrl: './salmeta-orria.component.html',
  styleUrl: './salmeta-orria.component.css',
})
export class SalmetaOrriaComponent implements OnInit {
  liburua: any;
  saltzaileak: any[] = [];
  saltzailea: any = {
    izena_abizena: '',
    email: '',
    pasahitza: '',
    erabiltzailea: '',
  };
  userLog: User = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null;

  mezuaEroslearengandik: string = '';

  constructor(
    private route: ActivatedRoute,
    private queryService: QueryService
  ) {}

  ngOnInit() {
    this.queryService.getUsers().subscribe((response) => {
      this.saltzaileak = response.users;
      console.log(this.saltzaileak);
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.queryService.getLiburuaById(id).subscribe((data) => {
        this.liburua = data.liburua;

        for (let i = 0; i < this.saltzaileak.length; i++) {
          if (this.liburua.user_id === this.saltzaileak[i].user_id) {
            this.saltzailea = this.saltzaileak[i];
            this.liburua.saltzaile_izena = this.saltzailea.izena_abizena;
            break;
          }
        }
      });
    }
  }

  eskaeraBidali() {
    if (this.mezuaEroslearengandik.trim() === '') {
      this.mezuaEroslearengandik = 'Salmenta eskaera bat.';
    }

    const notifikazioa = {
      liburu_id: this.liburua.liburu_id,
      saltzailea_id: this.saltzailea.user_id,
      eroslea_id: this.userLog.user_id,
      mezua: this.mezuaEroslearengandik,
    };

    this.queryService.sortuNotifikazioa(notifikazioa).subscribe({
      next: () => {
        alert('Zure eskaera bidali da!');
      },
      error: (err) => {
        console.error('Errorea eskaera bidaltzean:', err);
      },
    });
  }
}
