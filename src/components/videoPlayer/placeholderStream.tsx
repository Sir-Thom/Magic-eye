import { IPlaceholderStream } from "../../interfaces/IVideoPlayer";

export default function StreamPlaceholder({
    width,
    height,
    url
}: IPlaceholderStream) {
    return (
        <div data-testid="placeholderStream" className="flex justify-center items-center mx-16 mt-16 h-full">
            
            <video
            
                autoPlay
                loop
                controls={false}
                onContextMenu={(e) => e.preventDefault()}
                muted
                src={"http://127.0.0.1:16780/" + url + ".webm"}
                width={width * 0.6}
                height={height * 0.6}
            ></video>
        </div>
    );
}
