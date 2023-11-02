export interface IToast {
    message: string;
    timer: number;
    type: "success" | "error" | "warning" | "info";
    onDismiss: () => void;
}
