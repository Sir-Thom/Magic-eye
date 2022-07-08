#!/usr/bin/env python3
import gi
import numpy
import subprocess
import os
from subprocess import call
import configparser
gi.require_version('GstVideo', '1.0')
gi.require_version('Gst', '1.0')
gi.require_version('GstRtspServer', '1.0')
gi.require_version('GdkX11', '3.0')
gi.require_version('Gtk','3.0')
from gi.repository import Polkit
from gi.repository import Gst, GLib, GObject, GstRtspServer,Gtk
from gi.repository import GdkX11, GstVideo
Gst.init(None)

class UI(Gtk.Window):
    def __init__(self):
        app_name = "CamViewerRtsp"
        config_folder = os.path.join(os.path.expanduser("~"), '.config', app_name)
        config = configparser.ConfigParser()
        builder=Gtk.Builder
        Gtk.Window.__init__(self, title="Mode ")
        self.set_default_size(400, 200)
        grid = Gtk.Grid(row_spacing =10,column_spacing = 10,column_homogeneous = True)
    
        self.set_border_width(10)
       
    
        hostBtn = Gtk.Button(label="Host")
        hostBtn.connect("clicked",self.loadHost)
        
        serverBtn = Gtk.Button(label="Server")
        serverBtn.connect("clicked",self.loadServer)
        grid.add(hostBtn)
        grid.attach(serverBtn, 1, 0, 1, 1)
        self.add(grid)
      
    def loadHost(file,shellBool):
        file=os.path.dirname(os.path.abspath(__file__))+"/host.py"
        shellBool= False
        subprocess.Popen(file, shell=shellBool)
    
    def loadServer(file,shellBool):
        file=os.path.dirname(os.path.abspath(__file__))+"/server.py"
        shellBool= False
        subprocess.Popen(file, shell=shellBool)

win = UI()
win.connect("destroy", Gtk.main_quit)
win.show_all()
Gtk.main()
