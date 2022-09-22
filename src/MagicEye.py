#!/bin/env python3
import sys
import gi
import os
import threading
from ui.AboutSection import  aboutSection
import configparser
from settings import Config
import client as client
import server as server
from ui.Ui import MainUi as ui
gi.require_version('GstVideo', '1.0')
gi.require_version('Gst', '1.0')
gi.require_version('Gdk', '3.0')
gi.require_version('Gtk', '3.0')
from gi.repository import Gst, GLib, GObject,Gtk,Gio,GdkPixbuf
from gi.repository import Gdk, GstVideo
Gdk.set_allowed_backends("x11")

Gst.init(None)

class UI(Gtk.Window):
   
    Gdk.set_allowed_backends("x11")
    def __init__(self):  
        tPackage = threading.Thread(target=self.package_check)
        tPackage.start()
        
        config = configparser.ConfigParser()
        config.read(Config.full_config_file_path)
        print(Config.full_config_file_path)
        Config.create_config(self)
        
        
        ui.GenerateMainUi(self)
        
    def on_Quit(self):
        Gtk.main_quit
        sys.exit()

    def onLoadDialogAbout(self,window):
        aboutSection.About(self)
       

    def loadClient(self, window):
        os.environ['GDK_BACKEND'] = 'x11'
        client.main()
        client.Player.__init__

    def loadServer(self, window):
        os.environ['GDK_BACKEND'] = 'x11'
        server.main()
        server.ServerGui.__init__
        
        
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
        print("looking package")
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
                #MessageBox.MessageBox("Missing Dependancy","Do you want to install the dependancy ?","Confirmation")
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
    filename = '/home/'+str(os.getlogin())+'/.local/share/icons/MagicEye-icon/magiceye-06.svg'
    print(filename)
    icon_app_path =filename
    pixbuf = GdkPixbuf.Pixbuf.new_from_file(icon_app_path)
    win.set_icon(pixbuf)
    win.connect("destroy",Gtk.main_quit)
    win.show_all()
    Gtk.main()

main()
