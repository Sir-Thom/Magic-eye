#!/bin/env python3
import gi
import os
gi.require_version('Gdk', '3.0')
gi.require_version('Gtk', '3.0')
from gi.repository import GLib, GObject,Gtk,Gio,GdkPixbuf
class aboutSection():
    def About(self):

        filename = '/home/'+str(os.getlogin())+'/.local/share/icons/MagicEye-icon/magiceye-small.svg'
        print(filename)
        icon_app_path =filename
        pixbuf = GdkPixbuf.Pixbuf.new_from_file(icon_app_path)  
        aboutSection = Gtk.AboutDialog(transient_for=self)
        aboutSection.set_default_size(350, 300)
        aboutSection.set_authors(['Thomas Toulouse'])
        aboutSection.set_license("GPL-3.0 license")
        aboutSection.set_artists(["ei8htz"])
        aboutSection.set_logo(pixbuf)
        aboutSection.set_program_name("Magic Eye")
        aboutSection.set_version("0.8.2 (prerelease)")
        aboutSection.set_website("https://github.com/Thomas-Toulouse/Magic-Eye")
        aboutSection.set_website_label("https://github.com/Thomas-Toulouse/Magic-Eye")
        aboutSection.show_all()
        aboutSection.run()
        aboutSection.destroy() 
