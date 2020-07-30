export interface holydayEntry {
  id: Date;
  rel: string;
  names: string;
  off: string;
  sec: string;
  fast: number;
  moon: number;
  link: string;
}

export interface calendarData {
  [x: string]: any;
  data: holydayEntry[];
}
