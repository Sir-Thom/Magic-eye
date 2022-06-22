import gi
gi.require_version('Gtk','3.0')
from gi.repository import Gtk
screenWidth = str(Gtk.Window().get_screen().get_width())
screenHeight = str(Gtk.Window().get_screen().get_height())
# camera option
v4l2srcLaunch = f"v4l2src device=/dev/video0  ! videoconvert  ! theoraenc ! queue ! rtptheorapay name=pay0"
rpicamsrc = f"rpicamsrc bitrate=8000000 preview=flase ! videoconvert ! video/x-h264, width={screenWidth}, height={screenHeight} ! h264parse ! queue ! rtph264pay name=pay0"

#network option 
port = "8554"
mount_point = "/tmp"

#videotestsrc pattern option
smpte = "smpte"
snow = "snow"
black = "black"
red = "red"
green = "green"
blue = "blue"
checkers1 = "checkers-1"
checkers2 = "checkers-2 "
checkers4 = "checkers-4"
checkers8 = "checkers-8"
circular = "circular"
blink = "blink"
smpte75 = "smpte75"
zoneplate = "zone-plate kx2=20 ky2=20 kt=1"
gamut = "gamut"
chromazoneplate = "chroma-zone-plate kx2=20 ky2=20 kt=1"
solidcolor = "solid-color"
ball = "ball"
smpte100 = "smpte100"
bar = "bar"
pinwheel = "pinwheel kx2=20 ky2=20 kt=1"
spokes = "spokes"
gradient = "gradient"
colors = "colors"
smpterp219 = "smpte-rp-219"
defaultPattern = smpterp219