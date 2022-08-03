#!/usr/bin/env python3
import gi
import os
from settings import Config
import configparser
import socket

gi.require_version('GstVideo', '1.0')
gi.require_version('Gst', '1.0')
gi.require_version('GstRtspServer', '1.0')
gi.require_version('Gdk', '3.0')
gi.require_version('Gtk','3.0')
from gi.repository import Gst, GLib, GObject, GstRtspServer,Gtk
from gi.repository import Gdk, GstVideo


Gst.init(None)

class ServerGui(Gtk.Window):
    global entry
    entry = Gtk.Entry()
    Gdk.set_allowed_backends("wayland,x11")
    launchMode =""
    global state
    global port
    global mount_point
    state =""

    config = configparser.ConfigParser()
    config.read(Config.full_config_file_path)

    port =  config.get('NETWORK_OPTION',"port")
    mount_point = config.get('NETWORK_OPTION',"mount_point")

    def __init__(self):

        builder=Gtk.Builder
        hostname = socket.gethostname()
        IPAddress = socket.gethostbyname(hostname)
        ip_ard=socket.getfqdn(IPAddress)
        print("Your Computer Name is:" + hostname)
        print("Your Computer IP Address is: " + IPAddress)

        Gtk.Window.__init__(self, title="Server of "+ hostname)
        print (Gtk.Window().get_screen().get_width())
        self.set_default_size(800, 450)
        self.set_border_width(10)
       


        grid = Gtk.Grid(row_spacing =10,column_spacing = 10,column_homogeneous = True)
        grid.set_row_homogeneous(False)
        print(grid)
        grid.set_vexpand(True)
        grid.set_hexpand(True)
     
        self.add(grid)
        grid.set_column_spacing(10)
        grid.set_row_spacing(5)
        vbox = Gtk.Box(orientation=Gtk.Orientation.VERTICAL)
        entry.set_editable(False)
        entry.set_placeholder_text("Server IP adress")
        grid.attach(entry,5 ,9, 1, 1)   
        frame = Gtk.Frame(label="Options")
        CamModeV4l2src = Gtk.CheckButton(label="v4l2src")
        CamModeV4l2src.connect("toggled", self.on_button_toggled, "v4l2src")
        vbox.add(CamModeV4l2src)
        frame.add(vbox)
        print(CamModeV4l2src.get_active())


        connectButton = Gtk.Button(label="start stream")
        connectButton.connect("clicked", self.Connect)

        grid.attach(connectButton, 5,6, 1, 1)
        CamMode = Gtk.CheckButton(label="rpicamsrc")
        CamMode.connect("toggled", self.on_button_toggled, "rpicamsrc")
        grid.attach(frame,0,0,2,1)
        vbox.add(CamMode)
        print(CamMode.get_active())

    def on_button_toggled(self,CamMode, name):
        config = configparser.ConfigParser()
        config.read(Config.full_config_file_path)
        global state
        if CamMode.get_active() and name == "v4l2src":
            state = "v4l2src"
            self.launchMode = config.get("CAMERA_OPTION",'v4l2srcLaunch')

        elif CamMode.get_active() and name == "rpicamsrc":
            state = "rpicamsrc"
            self.launchMode = config.get("CAMERA_OPTION",'rpicamsrc')
            print(self.launchMode)
            print(state)
            
        else:
            state = ""
            self.launchMode = ""
        print("Button", name, "was turned", state)

    @classmethod
    def Connect(self,cls):
        global state
        print("state: ",state)
        print("launchMethod: ",self.launchMode)
        config = configparser.ConfigParser()
        config.read(Config.full_config_file_path)
        if state == "v4l2src":
             self.launchMode =  config.get("CAMERA_OPTION",'v4l2srcLaunch')
             print("state: ",state)
        if state == "rpicamsrc":
             self.launchMode =  config.get("CAMERA_OPTION",'rpicamsrc')
             print("state: ",state)

        hostname = socket.gethostname()
        ipAddr =socket.gethostbyname(hostname)


        server = GstRtspServer.RTSPServer.new()
        server.set_service(port)

        mounts = server.get_mount_points()
        factory = GstRtspServer.RTSPMediaFactory.new()

        factory.set_launch(self.launchMode)
        mounts.add_factory(mount_point, factory)

        #  start server
        if self.launchMode == "":
                print("launchMode is empty")
        else:
             print("launchMethod: ",self.launchMode)
             print ("stream ready at rtsp://"+ ipAddr +":" + port + mount_point)
             entry.set_text(ipAddr)
             server.attach()


app = ServerGui()
app.connect("destroy", Gtk.main_quit)
app.show_all()
Gtk.main()
app.__init__()
