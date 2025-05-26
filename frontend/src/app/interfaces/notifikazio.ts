export interface Notifikazio {
  id: number;
  liburu_id: number;
  erosketa_egilea_id: number;
  saltzailea_id: number;
  saltzaile_izena?: string;
  saltzaile_email?: string;
  saltzaile_telefonoa?: string;
  saltzaile_helbidea?: string;
  liburua_izena?: string;
  egoera: 'zain' | 'onartua' | 'ezetsia';
  mezua: string;
  data: Date;
}
