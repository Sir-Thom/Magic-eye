import gi
from gi.repository import Gst, GstRtspServer, GLib

gi.require_version('Gst', '1.0')
gi.require_version('GstRtspServer', '1.0')

class HslRtspServer(GstRtspServer.RTSPMediaFactory):
    def __init__(self, **properties):
        super(HslRtspServer, self).__init__(**properties)

    def do_create_element(self, url):
        hsl_pipeline = "(videotestsrc ! x264enc ! mpegtsmux ! hlssink)"
        return Gst.parse_launch(hsl_pipeline)

class GstServer():
    def __init__(self):
        self.server = GstRtspServer.RTSPServer.new()
        self.server.set_service("8554")

        factory = HslRtspServer()
        factory.set_shared(True)
        mount_points = self.server.get_mount_points()
        mount_points.add_factory("/test", factory)

        self.server.attach(None)
        print(self.server)
    def start(self):
        print("RTSP server started")
        
        print("RTSP server's url: rtsp://localhost:8554/test")
        loop = GLib.MainLoop()
        loop.run()

if __name__ == '__main__':
    Gst.init(None)
    server = GstServer()
    server.start()
