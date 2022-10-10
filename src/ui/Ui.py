#!/bin/env python3
import gi
gi.require_version('GstVideo', '1.0')
gi.require_version('Gst', '1.0')
gi.require_version('Gdk', '3.0')
gi.require_version('Gtk', '3.0')
from gi.repository import Gst, GLib, GObject,Gtk,Gio,GdkPixbuf
from gi.repository import Gdk, GstVideo
import socket
class MainUi(Gtk.Window):
    def GenerateMainUi(self):
        Gdk.set_allowed_backends("wayland,x11")
        builder=Gtk.Builder()

        Gtk.Window.__init__(self, title="headerBar")
        self.set_default_size(800, 450)
        grid = Gtk.Grid(row_spacing =10,column_spacing = 10,column_homogeneous = True)

        self.set_border_width(10)
        clientBtn = Gtk.Button(label="client")
        clientBtn.connect("clicked",self.loadClient)

        serverBtn = Gtk.Button(label="Server")
        serverBtn.connect("clicked",self.loadServer)

        headerBar = Gtk.HeaderBar()
        headerBar.set_show_close_button(True)
        headerBar.props.title = "Magic Eye"
        self.set_titlebar(headerBar)

        self.popover = Gtk.Popover()
        vbox = Gtk.Box(orientation=Gtk.Orientation.VERTICAL)
        aboutBtn=Gtk.Button(label="About",relief=2)
        vbox.pack_start(aboutBtn, False, True, 10)
        aboutBtn.connect("clicked",self.onLoadDialogAbout)
        vbox.show_all()
        self.popover.add(vbox)
        self.popover.set_position(Gtk.PositionType.BOTTOM)

        button = Gtk.MenuButton(popover=self.popover)
        #look in user icon dir
        icon = Gio.ThemedIcon(name="open-menu-symbolic")
        image = Gtk.Image.new_from_gicon(icon, Gtk.IconSize.BUTTON)
        button.add(image)
        headerBar.pack_end(button)
        
        window= Gtk.Window
        grid.add(clientBtn)
        grid.attach(serverBtn, 1, 0, 1, 1)
        self.add(grid)


class ClientUi(Gtk.Window):
    def GenerateClientUi(self):
            Gtk.Window.__init__(self, title="Magic Eye: Client")
            screenWidth = Gtk.Window().get_screen().get_width()
            screenHeight = Gtk.Window().get_screen().get_height()
            self.connect('destroy', self.quit)
            self.set_default_size(800, 550)
            self.set_border_width(10)
            
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
            #hostname = socket.gethostname()
            #ipadr = socket.gethostbyname(hostname)

            #print(ipadr)

            # Quit button
            quit = Gtk.Button(label="disconnect stream  ")
            quit.connect("clicked", self.exit_Stream)
            grid.attach(quit, 0, 2, 2, 1)

            # textbox
            global entry
            entry = Gtk.Entry()
            grid.attach_next_to(entry, quit, Gtk.PositionType.RIGHT, 4, 1)
            entry.set_placeholder_text("Server IP adress")
            self.entry = entry

            # link Ip button
            link = Gtk.Button(label="Link IP")
            link.connect("clicked", self.connexion_rtsp)
        
            # Create GStreamer pipeline
            grid.attach_next_to(link, entry, Gtk.PositionType.RIGHT, 2, 1)
    def Get_Entry(self,text):
        text = entry.get_text() 
        return text


class ServerUI(Gtk.Window):
    def Ui(self):
            global entry  
            entry = Gtk.Entry()
            Gtk.Window.__init__(self, title="Magic Eye: Server")
            print (Gtk.Window().get_screen().get_width())
            self.set_default_size(800, 450)
            self.set_border_width(10)


            grid = Gtk.Grid(row_spacing =10,column_spacing = 10,column_homogeneous = True)
            grid.set_row_homogeneous(False)
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
            vbox.set_border_width(10)
            connectButton = Gtk.Button(label="start stream")
            connectButton.connect("clicked", self.Connect)

            grid.attach(connectButton, 5,6, 1, 1)
            CamModeRpicam = Gtk.CheckButton(label="rpicamsrc")
            CamModeRpicam.connect("toggled", self.on_button_toggled, "rpicamsrc")
            grid.attach(frame,0,0,2,1)
            vbox.add(CamModeRpicam)

            CamModeV4l2src.set_tooltip_text("This option is for camera like a laptop webcam or any other external webcam and the raspberrypi (64 bits OS)")
            CamModeRpicam.set_tooltip_text("(Leagacy option )This option is made for the camera module of the raspberrypi.For best result use it if your OS is 32 bits. ")
            print(CamModeRpicam.get_active())
            self.connect('destroy', self.quit)
    def Set_Entry(self,ip):
         entry.set_text(ip)



