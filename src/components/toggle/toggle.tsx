import { Switch } from "@headlessui/react";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

interface ToggleProps {
    className?: string;
    enabled: boolean;
    value?: string;
    onChange: (checked: boolean) => void;
}

export default function Toggle({
    enabled,
    onChange,
    className,
    value
}: ToggleProps) {
    return (
        <Switch
            checked={enabled}
            onChange={onChange}
            value={value}
            className={`${className} ${" relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center outline-none outline-2  border-none focus:outline-accent-color1-700  text-text-dark rounded-full "}`}
        >
            <span className="sr-only">Use setting</span>
            <span
                aria-hidden="true"
                className="pointer-events-none absolute h-full w-full rounded-md bg-window-dark-400"
            />
            <span
                aria-hidden="true"
                className={classNames(
                    enabled ? "bg-accent-color1-600" : " bg-window-dark-300",
                    "pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out"
                )}
            />
            <span
                aria-hidden="true"
                className={classNames(
                    enabled ? "translate-x-5" : "translate-x-0",
                    "pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border  bg-window-dark-300  transition-transform duration-200 ease-in-out"
                )}
            />
        </Switch>
    );
}
