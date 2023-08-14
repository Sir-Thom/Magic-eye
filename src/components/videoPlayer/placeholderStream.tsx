import { IPlaceholderStream } from "../../interfaces/IVideoPlayer";

export default function StreamPlaceholder({
  width,
  height,
  url
}: IPlaceholderStream) {
  return (
    <div className="flex justify-center items-center mx-16 mt-16 h-full">
      <video
        autoPlay
        loop
        controls={false}
        onContextMenu={(e) => e.preventDefault()}
        muted
        src={url}
        width={width * 0.6}
        height={height * 0.6}
      ></video>
    </div>
  );
}
