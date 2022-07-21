pyinstaller main.py -F \
--name "CamViewerRtsp" \
--add-data="host.py:data" \
--add-data="server.py:data" \
--add-data="settings.py:data" \
--clean \
