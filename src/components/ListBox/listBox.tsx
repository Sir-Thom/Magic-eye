interface ListBoxProps {
    data: any; // JSON data
    // An array of field names to display
}

function ListBox({ data }: ListBoxProps): JSX.Element {
    const { itemCount, pageCount, items } = data;
    console.log("itemCount:" + itemCount);
    console.log("pageCount:" + pageCount);
    console.log("items:" + items);
    return (
        <div className="p-4">
            <p className="text-lg">Total Items: {itemCount}</p>
            <p className="text-lg">Total Pages: {pageCount}</p>

            <div className="mt-4">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className=" bg-window-dark-500 text-white p-2 my-2 rounded"
                    >
                        <p>ID: {item.id}</p>
                        <p>Created: {new Date(item.created).toDateString()}</p>
                        <p>Remote Address: {item.remoteAddr}</p>
                        <p>Bytes Received: {item.bytesReceived} bytes</p>
                        <p>Bytes Sent: {item.bytesSent} bytes</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListBox;
