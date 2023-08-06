export interface IModal {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
