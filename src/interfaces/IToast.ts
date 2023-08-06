export interface IToast {
  message: string;
  timer: number; // Duration for which the toast should be visible
  onDismiss: () => void; // New prop to handle the dismiss action<
}
