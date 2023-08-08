export interface IAlert {
  message: string;
  timer: number;
  OnClose: () => void;
}
