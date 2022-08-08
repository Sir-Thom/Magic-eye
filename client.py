#!/usr/bin/env python3
import configparser
import gi
from os import devnull, path
import socket
import os
import sys
from settings import Config

gi.require_version('Gdk', '3.0')
gi.require_version('Gst', '1.0')
gi.require_version('Gtk', '3.0')
gi.require_version('GstVideo', '1.0')
from gi.repository import GObject, Gst, Gtk,GdkPixbuf
from gi.repository import Gdk, GstVideo
Gdk.set_allowed_backends("x11")
Gtk.init(None)
print( os.environ )
class Player(Gtk.Window):
    global is_active

    def __init__(self):
        
        os.system = "export GDK_BACKEND=x11"
        
        # basic window creation
        builder = Gtk.Builder
        config = configparser.ConfigParser()
        config.read(Config.full_config_file_path)

        portcfg = config.get('NETWORK_OPTION', "port")
        print(portcfg)
        os.environ['GDK_BACKEND'] = 'x11'
        print( os.environ )
        Gtk.Window.__init__(self, title="Magic Eye: Client")
        screenWidth = Gtk.Window().get_screen().get_width()
        screenHeight = Gtk.Window().get_screen().get_height()
        self.connect('destroy', self.quit)
        self.set_default_size(800, 550)
        self.set_border_width(10)

      
        #headerBar = Gtk.HeaderBar()
        #headerBar.set_show_close_button(True)
        #headerBar.props.title = "Magic Eye"
        #headerBar.set_decoration_layout(None)
        #self.set_titlebar(headerBar)
        #self.add(headerBar)
        
        # Create DrawingArea for video widget
        self.drawingarea = Gtk.DrawingArea()
        self.drawingarea.set_content_height = screenHeight
        self.drawingarea.set_content_width = screenWidth
      
        # Create a grid for the DrawingArea and buttons
        grid = Gtk.Grid(row_spacing=10, column_spacing=10, column_homogeneous=False)
        self.add(grid)
        grid.set_column_spacing(10)
        grid.set_row_spacing(5)
        grid.attach(self.drawingarea, 0, 1, 8, 1)
        print(grid.get_child_at(1, 1))
        self.drawingarea.set_hexpand(True)
        self.drawingarea.set_vexpand(True)

        # get device ip adress
        hostname = socket.gethostname()
        ipadr = socket.gethostbyname(hostname)

        print(ipadr)

        # Quit button
        quit = Gtk.Button(label="close  client")
        quit.connect("clicked", Gtk.main_quit)
        grid.attach(quit, 0, 2, 2, 1)

        # textbox
        entry = Gtk.Entry()
        grid.attach_next_to(entry, quit, Gtk.PositionType.RIGHT, 4, 1)
        entry.set_placeholder_text("Server IP adress")
        self.entry = entry

        # link Ip button
        link = Gtk.Button(label="Link IP")
        link.connect("clicked", self.connexion_rtsp)

        # Create GStreamer pipeline
        grid.attach_next_to(link, entry, Gtk.PositionType.RIGHT, 2, 1)

    # for webcam

    def no_cam_feed(self):

        config = configparser.ConfigParser()
        config.read(Config.full_config_file_path)
        patternChoice = config.get('PATTERN_OPTION', "smpterp219")  
        screenWidth = str(Gtk.Window().get_screen().get_width())
        screenHeight = str(Gtk.Window().get_screen().get_height())
        print(screenWidth, screenHeight)
        print(config.options('PATTERN_OPTION')[1])
        config.options('PATTERN_OPTION')
        is_active = False
        print(is_active)
        print(patternChoice)
        self.show_all()
        self.xid = self.drawingarea.get_property('window').get_xid()
        self.fps = 60
        self.pipeline = Gst.parse_launch(
            f"videotestsrc  pattern={patternChoice} ! tee name=tee ! queue name=videoqueue !  video/x-raw,width={screenWidth},height={screenHeight} ! deinterlace ! xvimagesink")

        # Create bus to get events from GStreamer pipeline
        bus = self.pipeline.get_bus()
        bus.add_signal_watch()
        bus.connect('message::eos', self.on_eos)
        bus.connect('message::error', self.on_error)
        bus.enable_sync_message_emission()
        bus.connect('sync-message::element', self.on_sync_message)
        self.pipeline.set_state(Gst.State.PLAYING)
        self.run()

    # will connect the device to the host server (the one with the cam)
    def connexion_rtsp(self, ipard):
        config = configparser.ConfigParser()
        config.read(Config.full_config_file_path)
        is_active = True
        print(is_active)
        self.pipeline.set_state(Gst.State.NULL)
        self.show_all()
        ipard = self.entry.get_text()
        port = config.get('NETWORK_OPTION', "port")
        mount_point = config.get('NETWORK_OPTION', "mount_point")
        Config.create_config(self)

        self.xid = self.drawingarea.get_property('window').get_xid()
        print(ipard)

        self.pipeline = Gst.parse_launch(
            f"rtspsrc location=rtsp://{ipard}:{port}/{mount_point} ! rtpjitterbuffer post-drop-messages=True do-retransmission=True  !  queue ! decodebin  ! videoconvert ! autovideosink sync=false ")

        # error message
        bus = self.pipeline.get_bus()
        bus.add_signal_watch()
        bus.connect('message::eos', self.on_eos)
        bus.connect('message::error', self.on_error)
        bus.enable_sync_message_emission()
        bus.connect('sync-message::element', self.on_sync_message)
        self.pipeline.set_state(Gst.State.PLAYING)
        Gtk.main_quit()
        print("Is connected ")
        print(Gtk.main_level())

        # call the execution function
        self.run()
        print(Gtk.main_level())

    def run(self):
        os.environ['Gdk_BACKEND'] = 'x11'
        self.show_all()
        Gtk.main()

    def quit(self, window):
        self.pipeline.set_state(Gst.State.NULL)
        print(Gtk.main_level())
        Gtk.main_quit()
        print(Gtk.main_level())

    def MessageBox(self, title=str, text=str, type=str):
        dialog = dialog = Gtk.MessageDialog(
            transient_for=self,
            flags=0,
            message_type=Gtk.MessageType.INFO,
            buttons=Gtk.ButtonsType.OK,
            text=title,
        )
        dialog.format_secondary_text(
            text
        )
        dialog.run()
        print(type + " dialog closed")

        dialog.destroy()

    # Check Package manger apt or pacman

    

    def on_sync_message(self, bus, msg):
        if msg.get_structure().get_name() == 'prepare-window-handle':
            print('prepare-window-handle')
            msg.src.set_window_handle(self.xid)

    def on_eos(self, bus, msg):
        print('on_eos(): seeking to start of video')
        self.pipeline.seek_simple(
            Gst.Format.TIME,
            Gst.SeekFlags.FLUSH | Gst.SeekFlags.KEY_UNIT, 1)

    def on_error(self, bus, msg):
        self.pipeline.set_state(Gst.State.NULL)
        user = os.getlogin()
        # set special message if error occur
        if Gst.error_get_message(1, 8130):
            self.MessageBox("Error", f"{user}(Host) was unable to connect to the server", "error")

        # set full error message
        else:
            self.MessageBox("Error", str(msg.parse_error()), "error")
        print('on_error():', msg.parse_error())
        
def main():
    p = Player()
    icon_app_path = '/home/thomas/.local/share/icons/MagicEye-icon/magiceye-06.svg'
    pixbuf = GdkPixbuf.Pixbuf.new_from_file(icon_app_path)
    p.set_icon(pixbuf)
    p.no_cam_feed()
##p = Player()


if __name__ == "__main__":
    main()
    #import gtk
    # = Player()
   # Gtk.main()
    #p.show_all()
    #p.__init__()
   # p.no_cam_feed()
