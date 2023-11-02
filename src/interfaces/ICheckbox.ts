export default interface ICheckbox {
    checked: boolean;

    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: any;
    className?: string;
}
