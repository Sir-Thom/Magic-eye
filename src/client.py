#!/bin/env python3
from concurrent.futures import process
import configparser
from ui.Ui import ClientUi as ui
from os import devnull, path
import socket
import os
import sys
from settings import Config
import multiprocessing as mp
#gtk and gstreamer dependancies
import gi
gi.require_version('Gdk', '3.0')
gi.require_version('Gst', '1.0')
gi.require_version('Gtk', '3.0')
gi.require_version('GstVideo', '1.0')
from gi.repository import GObject, Gst, Gtk,GdkPixbuf
from gi.repository import  GstVideo
from gi.repository import Gdk as gdk
print(mp.cpu_count())
Gst.init(None)

Gtk.init(None)
class Player(Gtk.Window):

    global is_active

    def __init__(self):
        
        os.system = "export GDK_BACKEND=x11"
        print(gi.version_info)
        
        builder = Gtk.Builder
        config = configparser.ConfigParser()
        config.read(Config.full_config_file_path)

        ui.GenerateClientUi(self)
        portcfg = config.get('NETWORK_OPTION', "port")
        print(portcfg)
        os.environ['GDK_BACKEND'] = 'x11'
        os.environ.get("GDK_BACKEND")
        
        

    # for webcam

    def exit_Stream(self,w):
        self.pipeline.set_state(Gst.State.NULL)
        self.no_cam_feed


    def no_cam_feed(self):
        os.environ['GDK_BACKEND'] = 'x11'
        config = configparser.ConfigParser()
        config.read(Config.full_config_file_path)
        patternChoice = config.get('PATTERN_OPTION', "pattern")
        screenWidth = str(Gtk.Window().get_screen().get_width())
        screenHeight = str(Gtk.Window().get_screen().get_height())
        print(screenWidth, screenHeight)
        
        is_active = False
        print(is_active)
        print(patternChoice)
        self.show_all()
        self.xid = self.drawingarea.get_property('window').get_xid()
        self.fps = 60
        self.pipeline = Gst.parse_launch(
            f"videotestsrc   pattern={patternChoice} ! tee name=tee ! queue name=videoqueue !  video/x-raw,width={screenWidth},height={screenHeight}  ! deinterlace ! xvimagesink")

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
        ipard = ui.Get_Entry(self,ipard)
        port = config.get('NETWORK_OPTION', "port")
        mount_point = config.get('NETWORK_OPTION', "mount_point")
        Config.create_config(self)

        self.xid = self.drawingarea.get_property('window').get_xid()
        print(ipard)

        self.pipeline = Gst.parse_launch(
            f"rtspsrc location=rtsp://{ipard}:{port}/{mount_point}  ! rtpjitterbuffer post-drop-messages=True do-retransmission=True  !  queue ! decodebin  ! videoconvert ! autovideosink sync=false ")

        # error message
        bus = self.pipeline.get_bus()
        bus.add_signal_watch()
        bus.connect('message::eos', self.on_eos)
        bus.connect('message::error', self.on_error)
        bus.enable_sync_message_emission()
        bus.connect('sync-message::element', self.on_sync_message)
        self.pipeline.set_state(Gst.State.PLAYING)
        print("Is connected ")
        print(Gtk.main_level())

        # call the execution function
        self.run()
        print(Gtk.main_level())

    def run(self):
        os.environ['GDK_BACKEND'] = 'x11'
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
        err, debug = msg.parse_error()
        if str(err).startswith("gst-resource-error-quark"):
           
        # resource errors
            if str(err).endswith("(7)"):#no connection error
                self.MessageBox("Error", f"{user}(Host) was unable to connect to the camera.", "error")
            
            elif str(err).endswith("(9)"): #pipeline error 
                self.MessageBox("Error", f"{user}(Host) was unable to connect to the camera due to a error in the pipeline.", "error")
       
        # set full error message
        else: 
            self.MessageBox("Error", str(msg.parse_error()), "error")
        print('on_error():', msg.parse_error())
        
def main():
    p = Player()
    filename = '/home/'+str(os.getlogin())+'/.local/share/icons/MagicEye-icon/magiceye-06.svg'
    print(filename)
    icon_app_path =filename
    pixbuf = GdkPixbuf.Pixbuf.new_from_file(icon_app_path)
    p.set_icon(pixbuf)
    p.no_cam_feed()
    p.connect("destroy",Gtk.main_quit)



if __name__ == "__main__":
    proc = Process(main())
    proc.start()
    proc.join()
    main()

