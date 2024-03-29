import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useWindowDimensions } from "../../utils/WindowSize";
import Toast from "../notification/notification";
import { IVideoPlayer } from "../../interfaces/IVideoPlayer";
import StreamPlaceholder from "./placeholderStream";
import { invoke } from "@tauri-apps/api/core";
import { Suspense } from "react";
import Loader from "../loader/loader";

export default function VidPlayer() {
    const [url, setUrl] = useState("");
    const [streamUrl, setStreamUrl] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [placeholderUrl, setPlaceholderUrl] = useState("");
    const [error, setError] = useState<string | null>(null);


    const { height, width }: IVideoPlayer = useWindowDimensions();

    const prevErrorRef = useRef<string | null>(null);

    const handleDismissErrorToast = () => {
        setError(null);
    };

    useEffect(() => {
        (async () => {
            invoke("get_config_file_content").then((res: string) => {
                try {
                    const jsonObject = JSON.parse(res);
                    const placeholderValue = jsonObject.placeholder;
                    setPlaceholderUrl(placeholderValue.toString());
                } catch (error) {
                    throw new Error("Error parsing JSON:" + error);
                }
            });
        })();
    }, [placeholderUrl]);

    async function get_url() {
        try {
            const response = await fetch(url);

            if (response.status === 200) {
                setIsConnected(true);
                setStreamUrl(url);
                setError("");
            } else {
                throw new Error(
                    "The provided URL is not valid or the stream is down"
                );
            }
        } catch (err) {
            setIsConnected(false);
            handleDisconnect();
            handlePlayerError(err.message);
        }
    }

    const handlePlayerError = (error: unknown) => {
        setIsConnected(false);
        setError("An error occurred: " + error.toString());
    };

    function handleUrlChanged(e: React.ChangeEvent<HTMLInputElement>) {
        setUrl(e.target.value);
    }

    function handleDisconnect(): void {
        setIsConnected(false);
        setStreamUrl("");

 

        // Clear the error only if it's different from the previous one
        if (error && error !== prevErrorRef.current) {
            setError(null);
        }
        prevErrorRef.current = error;
    }

    return (
        <>
            <div className="flex h-full w-full justify-center items-center">
                <Suspense fallback={<Loader />}>
                    {streamUrl ? (
                        <ReactPlayer
                     
                            playing={isConnected}
                            onContextMenu={e => e.preventDefault()}                  
                            className="flex mx-16 mt-16"
                            url={streamUrl}
                            width={width}
                            height={height - 150}
                            controls={false}
                            onError={handlePlayerError}
                        />
                    ) : (
                        <StreamPlaceholder
                            width={width}
                            height={height}
                            url={placeholderUrl}
                        />
                    )}
                </Suspense>
            </div>
            <div className="w-full flex justify-center items-center pb-1 mt-6">
                <button
                    onClick={handleDisconnect}
                    type="button"
                    className="text-text-dark  bg-accent-color1-700 hover:bg-accent-color1-800 ml-16 font-bold py-2 px-4 rounded"
                >
                    Disconnect
                </button>
                <div className="mx-4 text-text-dark  flex-1">
                    <input
                        className="w-full border-2 border-gray-400 rounded items-center mt-1 py-2 mb-2 px-4"
                        type="text"
                        placeholder="Stream URL"
                        onChange={handleUrlChanged}
                    />
                </div>
                <button
                    onClick={get_url}
                    type={"button"}
                    className="bg-accent-color1-700 hover:bg-accent-color1-800 mr-16 font-bold py-2 px-4 rounded"
                >
                    Connect to Stream
                </button>
            </div>

            {error && (
                <Toast
                    message={error}
                    timer={5000}
                    type={"error"}
                    onDismiss={handleDismissErrorToast}
                />
            )}
        </>
    );
}
