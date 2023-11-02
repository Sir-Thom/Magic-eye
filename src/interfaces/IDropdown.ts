// eslint-disable-next-line no-unused-vars
type Event = (event: React.ChangeEvent<HTMLSelectElement>) => void;

export interface IDropdown {
    options: (string | number)[];
    value: string | number;
    onChange: Event;
    className?: string;
}
