#/usr/bin/sh
# pyinstaller main.py -F \
# --name "CamViewerRtsp" \
# --add-data="host.py:data" \
# --add-data="server.py:data" \
# --add-data="settings.py:data" \
# --clean \c
echo "installing Camip..."
cd Camip
chmod +x *.py
cd ..
sudo  cp -a Camip/.  /usr/bin
cp -a Camip/  ~/.local/bin
cp Camip.desktop ~/.local/share/applications
echo -n "Do you want Camip on your desktop? [y/n]"
read
         if [[ $REPLY == "y" || $REPLY ==  "Y" ]]; then
                 cp Camip.desktop ~/Desktop
                 alias camip='python /usr/bin/camip.py' >> ~/.bashrc
                 echo "installation completed"  
                 break
         fi
         if [[  $REPLY == "n" || $REPLY == "N" ]];then
                alias camip='python /usr/bin/camip.py' >> ~/.bashrc
                echo "installation completed"  
                exit
         fi
        if [[ $REPLY != "y" || $REPLY != "Y" || $REPLY != "n" || $REPLY != "N" ]];then
                echo -e "\e[0;31m"Error:Invalid input.  " \e[m""Do you want Camip on your desktop? [y/n]"
                read
                fi
#alias camip='python /usr/bin/camip.py' >> ~/.bashrc
