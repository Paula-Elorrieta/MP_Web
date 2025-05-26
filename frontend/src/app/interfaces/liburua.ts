export interface Liburua {
  liburu_id: number;
  tituloa: string;
  idazlea?: string;
  generoa?: string;
  prezioa: number;
  egoera: 'berria' | 'erdi-berria' | 'erabilita' | 'defektuekin';
  user_id?: number;
  saltzaile_izena?: string;
  irudia: string;
}
