""""
this is the file were the option for the module gst are define 
"""
import os
import gi
gi.require_version('Gtk','3.0')
from gi.repository import Gtk
import configparser
class Config():
    app_name = "CamViewerRtsp"
    config_folder = os.path.join(os.path.expanduser("~"), '.config', app_name)
    settings_file = "settings.conf"
    full_config_file_path = os.path.join(config_folder, settings_file)
    def create_config(self) :
        app_name = "CamViewerRtsp"
        config_folder = os.path.join(os.path.expanduser("~"), '.config', app_name)
        os.makedirs(config_folder, exist_ok=True)
        settings_file = "settings.conf"
        full_config_file_path = os.path.join(config_folder, settings_file)
        config = configparser.ConfigParser()
       # config['DEFAULT']= {'v4l2srcLaunch': 'v4l2src device=/dev/video0  ! videoconvert  ! theoraenc ! queue ! rtptheorapay name=pay0',"port":"8554",'mount_point':'/stream','defaultPattern': 'smpte-rp-219'}
        config['CAMERA_OPTION'] = {'v4l2srcLaunch': 'v4l2src device=/dev/video0  ! videoconvert ! video/x-raw,width=1280,height=720 ! theoraenc bitrate=8000000 quality=30 ! queue ! rtptheorapay name=pay0 ',
                            'rpicamsrc': 'rpicamsrc bitrate=8000000 preview=true ! videoconvert ! h264parse ! rtph264pay name=pay0 pt=96',
                            }
        config['NETWORK_OPTION'] = {}
        config['NETWORK_OPTION']["port"]="8554"
        config['NETWORK_OPTION']['mount_point']='/tmp'
        config['PATTERN_OPTION'] = {'smpte' : 'smpte',
                                                    'snow' : "snow",
                                                    'black' : "black",
                                                    'red' : "red",
                                                    'green' : "green",
                                                    'blue' : "blue",
                                                    'checkers1' : "checkers-1",
                                                    'checkers2' : "checkers-2 ",
                                                    'checkers4' : "checkers-4",
                                                    'checkers8' : "checkers-8",
                                                    'circular' : "circular",
                                                    'blink' : "blink",
                                                    'smpte75' : "smpte75",
                                                    'zoneplate': "zone-plate kx2=20 ky2=20 kt=1",
                                                    'gamut' : "gamut",
                                                    'chromazoneplate' : "chroma-zone-plate kx2=20 ky2=20 kt=1",
                                                    'solidcolor' : "solid-color",
                                                    'ball' : "ball",
                                                    'smpte100' : "smpte100",
                                                    'bar' : "bar",
                                                    'pinwheel' : "pinwheel kx2=20 ky2=20 kt=1",
                                                    'spokes':"spokes",
                                                    'gradient': "gradient",
                                                    'colors': "colors",
                                                    'smpterp219':'smpte-rp-219',
                                                    'defaultPattern': 'smpte-rp-219',
                                                }
                                                #config.update()
        if not os.path.exists(full_config_file_path) or os.stat(full_config_file_path).st_size == 0:
            with open(full_config_file_path, 'w') as configfile:
                config.write(configfile)