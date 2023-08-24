# this script take save a 10 seconds snapshot of GStreamer pattern of videotestsrc
import subprocess
import time
import signal
import argparse

def stop_pipeline(process):
    print("Stopping the pipeline...")
    process.send_signal(signal.SIGINT)
    process.wait()
    print("Pipeline stopped.")

def main():
    parser = argparse.ArgumentParser(description="Record GStreamer pipeline output to a WebM file.")
    parser.add_argument("--pattern", default="smpte", help="Pattern for videotestsrc")
    args = parser.parse_args()

    output_file = f"placeholder-{args.pattern}.webm"
    pipeline_command = (
         f"gst-launch-1.0 videotestsrc pattern={args.pattern} ! videoconvert ! vp8enc ! matroskamux ! filesink location={output_file}"
    )

    try:
        process = subprocess.Popen(pipeline_command, shell=True)
        print("Pipeline started. Waiting for 10 seconds...")
        time.sleep(1)
        stop_pipeline(process)
    except KeyboardInterrupt:
        stop_pipeline(process)
        print("Pipeline stopped due to user interrupt.")

if __name__ == "__main__":
    main()
