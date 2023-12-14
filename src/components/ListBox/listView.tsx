import { ReactNode } from "react";
import { IListView } from "../../interfaces/IListView";
import { FaTrashCan } from "react-icons/fa6";

export default function ListView({
    fetchData: data,
    DeleteFunc,
    canDelete
}: IListView) {
    return (
        <div className="overflow-hidden rounded-md bg-window-dark-700 shadow-window-light-600">
            <ul role="list" className="divide-y px-4  divide-window-dark-100">
                {data.map((item, index) => (
                    <li key={index} className="py-5 flex items-center">
                        <div>
                            <p className="font-bold leading-6 divide-y-1 text-white">
                                {item.id}
                            </p>
                            {Object.entries(item).map(([key, value]) => (
                                <div key={key}>
                                    <p className="mt-1 truncate leading-5 text-white">
                                        {key} : {value as ReactNode}
                                    </p>
                                </div>
                            ))}
                        </div>
                        {canDelete == true && (
                            <button
                                onClick={() => DeleteFunc(item.id)}
                                className="absolute hover:text-red-500 right-0 mr-8 text-white"
                            >
                                <FaTrashCan size={18} />
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
