project('CamViewerRtsp',
    version: '0.1',
    meson_version: '>= 0.59.0'
)


#importing modules
python = import('python')

# Module objects
py_installation = python.find_installation('python3')

PROJECT_RDNN_NAME = 'Myapp'
# Make sure Python is installed and found
if not py_installation.found()
    error('No valid python3 binary found')
endif

# Python 3.7 is needed for postponed evalution of annotations
if not py_installation.language_version().version_compare('>= 3.7')
  error('Python 3.7 or newer is required.')
endif





APPLICATION_ID = 'Myapp@0@'
PYTHON_DIR = py_installation.get_path('purelib')
PKGDATA_DIR = join_paths(get_option('prefix'), get_option('datadir'), APPLICATION_ID)
PKGLIB_DIR = join_paths(get_option('prefix'), get_option('libdir'), APPLICATION_ID)

#executable('CamViewer', 'main.py')

# Dependencies
dependency('glib-2.0', version: '>= 2.67.1')
#dependency('gtk3', version: '>= 3.24.34')
dependency('gobject-introspection-1.0', version: '>= 1.35.0')
#dependency('--1.0', version: '>= 1.35.0')
#dependency('gst-plugin-bad',version: '>= 1.20.3')
#dependency('gst-plugin-good',version: '1.20.3')
#dependency('gst-plugin-ugly',version: '1.20.3')
#dependency('gst-rtsp-server',version: '1.20.3')
#dependency('gstreamer',version: '1.20.3')

# Install the executable file
bin_config = configuration_data()
bin_config.set('application_id', APPLICATION_ID)
bin_config.set('rdnn_name', PROJECT_RDNN_NAME)
bin_config.set('pkgdatadir', PKGDATA_DIR)
bin_config.set('localedir', join_paths(get_option('prefix'), get_option('datadir'), 'locale'))
bin_config.set('pythondir', PYTHON_DIR)
bin_config.set('schemasdir', PKGDATA_DIR)

bin_config.set('local_build', 'False')
