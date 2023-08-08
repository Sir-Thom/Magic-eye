export interface IToast {
  message: string;
  timer: number;
  onDismiss: () => void;
}
