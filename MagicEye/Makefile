# Signifies our desired python version
# Makefile macros (or variables) are defined a little bit differently than traditional bash, keep in mind that in the Makefile there's top-level Makefile-only syntax, and everything else is bash script syntax.
PYTHON = python3
PIP = pip3
# .PHONY defines parts of the makefile that are not dependant on any specific file
# This is most often used to store functions
.PHONY = install clean


test:
	ls dist
	
install:
	pyinstaller --hidden-import settings  -n 'Magic Eye' --onefile MagicEye.py 
#	$(PYTHON) MagicEye.py#
	mkdir 'MagicEye-icon'
	mv -T icon/ MagicEye-icon
	mv  MagicEye-icon  ~/.local/share/icons 
	chmod +x 'Magic Eye.desktop'
	mv 'Magic Eye.desktop' ~/.local/share/applications/
#	Desktop := "[Desktop Entry]\nCategories=Network;VideoConference\nComment[en_US]=A small gui application that let set and use rtsp stream form any computer\nComment= A small gui application that let set and use rtsp stream form any computer\nExec=/bin/'Magic Eye'\nGenericName=Applications\nIcon=/home/thomas/.local/share/icons/MagicEye/magiceye-06.svg\nMimeType=\nName[en_US]=Magic Eye\nName=Magic Eye"  
#	echo -e $(Desktop) > 'Magic Eye.desktop'
	mv -T dist/'Magic Eye' /usr/local/bin
#mv -T dist/'Magic Eye' /bin
	echo Installation completed

	

	


# In this context, the *.project pattern means "anything that has the .project extension"
clean:
	rm -rf __pycache__
	rm -r pwd
