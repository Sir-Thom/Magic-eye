#!/bin/env python3
""""
this is the file were the option for the module gst are define 
"""

from logging import root
import os
import configparser


class Config():

    app_name = "MagicEye"
    config_folder = os.path.join(os.path.expanduser("~"), '.config', app_name)
    settings_file = "settings.conf"
    full_config_file_path = os.path.join(config_folder, settings_file)
    
    def create_config(self) :
        print("start creation")
        app_name = "MagicEye"
        config_folder = os.path.join(os.path.expanduser("~"), '.config', app_name)

        settings_file = "settings.conf"
        full_config_file_path = os.path.join(config_folder, settings_file)
        config = configparser.ConfigParser()
        config['CAMERA_OPTION'] = {'v4l2srcLaunch': 'v4l2src device=/dev/video0  ! videoconvert ! video/x-raw,width=1280,height=720 ! theoraenc bitrate=8000000 quality=48 ! queue ! rtptheorapay name=pay0  ',
                            'rpicamsrc': 'rpicamsrc bitrate=8000000 preview=false vflip=true ! video/x-h264,width=1280,height=720 ! h264parse ! rtph264pay name=pay0 pt=96',
                            }
        config['NETWORK_OPTION'] = {}
        config['NETWORK_OPTION']["port"]="8554"
        config['NETWORK_OPTION']['mount_point']='/tmp'
        config['PATTERN_OPTION'] = {
                                                    'pattern':"smpte-rp-219"
                                                }
        config.set('PATTERN_OPTION', '#  there are many pattern for the idle state. for more information on this go to this website',"https://gstreamer.freedesktop.org/documentation/videotestsrc/index.html?gi-language=python#GstVideoTestSrcPattern")

        if not os.path.exists(full_config_file_path) or os.stat(full_config_file_path).st_size == 0:
            with open(full_config_file_path, 'w') as configfile:
                config.write(configfile)
Config.create_config(root)
