import { RiLoader4Line } from "react-icons/ri";

export default function Loader() {
    return (
        <div data-testid="loader" className="text-3xl bg-accent-color1-700">
            <RiLoader4Line className="animate-spin" />
        </div>
    );
}
