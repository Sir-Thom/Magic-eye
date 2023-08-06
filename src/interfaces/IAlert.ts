export interface IAlert {
  message: string;
  timer: number; // Duration for which the toast should be visible
  OnClose: () => void; // New prop to handle the dismiss action
}
