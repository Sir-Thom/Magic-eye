#!/usr/bin/env python3
import sys
import gi
import subprocess
import os
import threading
from subprocess import call
import configparser
from settings import Config
import client 
import server 
gi.require_version('GstVideo', '1.0')
gi.require_version('Gst', '1.0')
gi.require_version('Gdk', '3.0')
from gi.repository import Gst, GLib, GObject,Gtk,Gio,GdkPixbuf
from gi.repository import Gdk, GstVideo


Gst.init(None)


class UI(Gtk.Window):
    os.system='Gdk_BACKEND = x11'
    Gdk.set_allowed_backends("x11")
    def __init__(self):

        #Gdk.set_allowed_backends("x11")
        #icon = Gio.ThemedIcon(name="magiceye-02")
        #self.set_icon(icon)
        #icon = GdkPixbuf.Pixbuf.new_from_resource("magiceye-02.svg")
        #print(icon)
        #self.set_icon(icon)
        tPackage = threading.Thread(target=self.package_check)
        tPackage.start()
        Gdk.set_allowed_backends("wayland,x11")
        config = configparser.ConfigParser()
        config.read(Config.full_config_file_path)
        print(Config.full_config_file_path)
        Config.create_config(self)
        builder=Gtk.Builder()


        Gtk.Window.__init__(self, title="headerBar")
        self.set_default_size(800, 450)
        grid = Gtk.Grid(row_spacing =10,column_spacing = 10,column_homogeneous = True)

        self.set_border_width(10)
        print(Gdk.get_display())
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

        grid.add(clientBtn)
        grid.attach(serverBtn, 1, 0, 1, 1)
        self.add(grid)

    def onLoadDialogAbout(self,window):
        icon_app_path ='/home/thomas/.local/share/icons/MagicEye-icon/magiceye-small.svg'
        pixbuf = GdkPixbuf.Pixbuf.new_from_file(icon_app_path)  
        aboutSection = Gtk.AboutDialog(transient_for=self)
        aboutSection.set_default_size(350, 300)
        aboutSection.set_authors(['Thomas Toulouse'])
        aboutSection.set_license("GPL-3.0 license")
        aboutSection.set_artists(["ei8htz"])
        aboutSection.set_logo(pixbuf)
        aboutSection.set_program_name("Magic Eye")
        aboutSection.set_version("0.60 (prerelease)")
        aboutSection.set_website("https://github.com/Thomas-Toulouse/Magic-Eye")
        aboutSection.set_website_label("https://github.com/Thomas-Toulouse/Magic-Eye")
        aboutSection.show_all()
        aboutSection.run()
        aboutSection.destroy() 
        
       

    def loadClient(self, window):

        os.environ['GDK_BACKEND'] = 'x11'
        client.main()
        # Gtk.Window.new(Player)
        #Gtk.WindowType(0)
        client.Player.__init__
        #client.Player.no_cam_feed(client.Player)
        #file=os.path.dirname(os.path.abspath(__file__))+"/client.py"
        #shellBool= False
        #subprocess.Popen(file, shell=shellBool)

    def loadServer(self, window):
        os.environ['GDK_BACKEND'] = 'x11'
        server.main()
        server.ServerGui.__init__
      #  file=os.path.dirname(os.path.abspath(__file__))+"/server.py"
       # shellBool= False
       # subprocess.Popen(file, shell=shellBool)

    def MessageBox(self,title=str,text=str,type=str):
        #where every pop-up / messagebox are defines
        if(type=="error"):
            dialog = Gtk.MessageDialog(
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

        elif(type == "Confirmation"):
                dialog = Gtk.MessageDialog(
                transient_for=self,
                flags=0,
                message_type=Gtk.MessageType.INFO,
                buttons=Gtk.ButtonsType.YES_NO,
                text=title,
            )
                dialog.format_secondary_text(
                    text
                )
                response = dialog.run()
                if response == Gtk.ResponseType.YES:
                    pacmanCheck = os.system('command -v pacman >/dev/null')
                    aptCheck = os.system('command -v apt >/dev/null')
                    dnfCheck = os.system('command -v dnf >/dev/null')

                    if pacmanCheck != 256:
                        os.system('pkexec pacman -S gst-libav gst-plugins-bad gst-plugins-good gst-plugins-ugly gst-rtsp-server --noconfirm')
                    elif aptCheck != 256:         
                        os.system('pkexec apt -y install gstreamer-plugins-base gstreamer-plugins-good gstreamer-plugins-bad '
                                 'gstreamer-plugins-ugly gstreamer-libav'
                                'libgstrtspserver-1.0-dev gstreamer1.0-rtsp')
                    elif dnfCheck != 256:
                         os.system('pkexec dnf install gstreamer1-devel gstreamer1-plugins-base-tools gstreamer1-doc gstreamer1-plugins-base-devel gstreamer1-plugins-good gstreamer1-plugins-good-extras gstreamer1-plugins-ugly gstreamer1-plugins-bad-free gstreamer1-plugins-bad-free-devel gstreamer1-plugins-bad-free-extras gstreamer1-rtsp-server -y')

                    
        elif(type=="sucess"):
            dialog = Gtk.MessageDialog(
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
            
        print( type +": dialog closed")

        dialog.destroy()

    def package_check(self):
        print("hey")
        print(os.getlogin())
        pacmanCheck = os.system('command -v pacman >/dev/null')
        aptCheck = os.system('command -v apt >/dev/null')
        dnfCheck = os.system('command -v dnf >/dev/null')
        print(pacmanCheck)
        print(aptCheck)

        #debian-based packages
        if aptCheck != 256:
            listPackage= os.system('apt list --installed gstreamer-plugins-base gstreamer-plugins-good gstreamer-plugins-bad '
            'gstreamer-plugins-ugly gstreamer-libav'
            'libgstrtspserver-1.0-dev gstreamer1.0-rtsp')

            if listPackage != 256:

                print("completed")

            else:
                self.MessageBox("Missing Dependancy","Do you want to install the dependancy ?","Confirmation")
                print("Please verify if all of thos package are install ")

        #Arch-based packages
        elif pacmanCheck != 256 :
            listPackage = os.system('pacman -Qe gst-libav gst-plugins-bad gst-plugins-good gst-plugins-ugly gst-rtsp-server')

            if listPackage != 256:
                print("completed")
            else:
                self.MessageBox("Missing Dependancy","Do you want to install the dependancy ?","Confirmation")
                print("Please verify if all of thos package are install ")

        #Rpm-based packages (Dnf)
        elif dnfCheck != 256 :
            listPackage = os.system('dnf install gstreamer1-devel gstreamer1-plugins-base-tools gstreamer1-doc gstreamer1-plugins-base-devel gstreamer1-plugins-good gstreamer1-plugins-good-extras gstreamer1-plugins-ugly gstreamer1-plugins-bad-free gstreamer1-plugins-bad-free-devel gstreamer1-plugins-bad-free-extras gstreamer1-rtsp-server')
            if listPackage != 256:
                print("completed")
            else:
                self.MessageBox("Missing Dependancy","Do you want to install the dependancy ?","Confirmation")
                print("Please verify if all of thos package are install ")


def main():
    win = UI()
    icon_app_path ='/home/thomas/.local/share/icons/MagicEye-icon/magiceye-06.svg'
    pixbuf = GdkPixbuf.Pixbuf.new_from_file(icon_app_path)          
    win.set_icon(pixbuf)
    win.connect("destroy", Gtk.main_quit)
    win.show_all()
    Gtk.main()
    return 0

main()
