#This is my first makefile 
PYTHON = python3
PIP = pip3
# .PHONY defines parts of the makefile that are not dependant on any specific file
# This is most often used to store functions
.PHONY = install clean



	
install:
	mkdir ~/.config/MagicEye
	$(PYTHON) settings.py
	pyinstaller --hidden-import settings  -n 'Magic Eye' --onefile  MagicEye.py 
#	mkdir 'MagicEye-icon'
#	mv -T icon/ MagicEye-icon
	mv  MagicEye-icon  ~/.local/share/icons 
	chmod +x 'Magic Eye.desktop'
	mv 'Magic Eye.desktop' ~/.local/share/applications/
	cp 'dist/Magic Eye' /usr/local/bin
	pwd
	echo Installation completed

	

	


# In this context, the *.project pattern means "anything that has the .project extension"
clean:
	rm -rf __pycache__
#	rm -r pwd
