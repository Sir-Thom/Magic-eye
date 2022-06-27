from cProfile import label
import gi
import numpy
gi.require_version('GstVideo', '1.0')
gi.require_version('Gst', '1.0')
gi.require_version('GstRtspServer', '1.0')
gi.require_version('GdkX11', '3.0')
gi.require_version('Gtk','3.0')
from gi.repository import Gst, GLib, GObject, GstRtspServer,Gtk
from gi.repository import GdkX11, GstVideo
Gst.init(None)

class UI(Gtk.Window):
    def __init__(self):
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
    
        hostBtn = Gtk.MenuButton(label="Host",)
        #outerbox.pack_start(hostBtn, False, True, 0)
        #hbox.pack_start(hostBtn, True, True, 10)
        serverBtn = Gtk.MenuButton(label="Server")
        grid.add(hostBtn)
        grid.attach(serverBtn, 1, 0, 1, 1)
        self.add(grid)
        #outerbox.pack_start(serverBtn, False, True, 0)
        #hbox.pack_start(serverBtn,True,True,10)

win = UI()
win.connect("destroy", Gtk.main_quit)
win.show_all()
Gtk.main()
