export interface Report {
  id?: string;
  shipId: string;
  date: string; // ISO String veya YYYY-MM-DD
  mainEngine: {
    rpm: number;
    exhaustTemp: number;
    // diğer m/e verileri
  };
  generator: {
    load: number;
    // diğer jeneratör verileri
  };
  fluids: {
    hfo: number;
    mgo: number;
    lo: number;
    fw: number;
  };
  remarks?: string;
}
