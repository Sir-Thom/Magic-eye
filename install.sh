#/usr/bin/sh
# pyinstaller main.py -F \
# --name "CamViewerRtsp" \
# --add-data="host.py:data" \
# --add-data="server.py:data" \
# --add-data="settings.py:data" \
# --clean \c
cd Camip
chmod +x *.py
cd ..
sudo  cp -a Camip/.  /usr/bin
cp -a Camip/.  ~/.local/bin
#camviewer=sudo python /usr/local/bin/main.py >> ~/.bash_aliases
alias camip='python /usr/bin/camip.py' >> ~/.bashrc
