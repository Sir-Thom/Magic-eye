export interface IToggle{
    className?: string;
    enabled: boolean;
    value?: string;
    onChange: (checked: boolean) => void;
}