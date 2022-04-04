# Analysis-and-support-tool-for-charging-infrastructure.

The user is given two options to sign up and sign in.

To run this program use -> username - admin; password - admin.

Simulate and analyze the effect of introducing electric buses into a diesel only transit system. This program uses contraints to reduce bus trip assignments into a balanced assignment problem and then utilizes the linear sum assignment algorithm to produce the least cost bus trip assignment for each trip set.


##Installation Process##

#check python version
python --version
#install python if not yet installed

#check if pip is installed
pip -h
#if not install pip
python get-pip.py

#Install VScode
#Open VScode and add new source by cloning github directory

#go to Github:
https://github.com/fullhaider1997/Analysis-and-support-tool-for-charging-infrastructure
#Copy HTTPS link and paste in vs code source directory

#install virtual environment
#Open a terminal in VSCode
#then run scripts

pip install virtualenv
python3 -m venv env
pip install -r requirements.txt

How to run simulation:
Open project on VScode
switch directory to where env folder is located
run script below:

env\Scripts\activate  
python manage.py runserver
#then open link produced#


#to end session, run script
deactivate
