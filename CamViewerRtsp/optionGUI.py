#!/usr/bin/env python3
from cProfile import label
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
       
        # outerbox = Gtk.Box(spacing=6, orientation=Gtk.Orientation.HORIZONTAL)
        # self.add(outerbox)
        # #self.set_default_size(800, 550)
        self.set_border_width(10)
        #hbox = Gtk.Box(spacing=6)
        #self.add(hbox)
    
        hostBtn = Gtk.Button(label="Host")
        hostBtn.connect("clicked",self.loadHost)
        #outerbox.pack_start(hostBtn, False, True, 0)
        #hbox.pack_start(hostBtn, True, True, 10)
        serverBtn = Gtk.Button(label="Server")
        serverBtn.connect("clicked",self.loadServer)
        grid.add(hostBtn)
        grid.attach(serverBtn, 1, 0, 1, 1)
        self.add(grid)
        #outerbox.pack_start(serverBtn, False, True, 0)
        #hbox.pack_start(serverBtn,True,True,10)
    def loadHost(file,shellBool):
        file=os.path.dirname(os.path.abspath(__file__))+"/host.py"
        shellBool= False
        #call([python, file])
        #exec(open('host.py').read())
        #os.system("host.py")
        subprocess.Popen(file, shell=shellBool)
    def loadServer(file,shellBool):
        file=os.path.dirname(os.path.abspath(__file__))+"/server.py"
        shellBool= False
        subprocess.Popen(file, shell=shellBool)


win = UI()
win.connect("destroy", Gtk.main_quit)
win.show_all()
Gtk.main()
