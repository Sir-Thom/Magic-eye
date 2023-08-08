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
        width={width * 0.6}
        height={height * 0.6}
      >
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
