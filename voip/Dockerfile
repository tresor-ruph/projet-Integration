FROM ubuntu:latest

RUN apt-get update && apt-get install -y \
    vim \
    systemd \
    net-tools \
    telnet  \
    fail2ban \
    build-essential libxml2-dev libncurses5-dev linux-headers-`uname -r` libsqlite3-dev libssl-dev libedit-dev uuid-dev libjansson-dev
RUN mkdir /usr/src/asterisk
RUN cd /usr/src/asterisk
#aller telecharger asterisk ou faire un wget
#RUN wget http://downloads.asterisk.org/pub/telephony/asterisk/asterisk-17-current.tar.gz
COPY asterisk-17-current.tar.gz asterisk-17-current.tar.gz
RUN chmod 666 asterisk-17-current.tar.gz 
RUN tar -xvzf asterisk-17-current.tar.gz
RUN cd asterisk-17.3.0  




   
#puis aller ds /asterisk version /contrib/scripts
#et lancer ./install_prereq install                   
#ensuite ./configure => voir logo a la fin
#apres make menuselect
#aller changer les sons et prendre fr ulow et alow
#apres make && make install
#apres make samples 
#puis make config
#make install-logrotate
#remplacer sip.conf et extensions.conf et voicemail.conf(ds le dossier /etc/asterisk)
#service asterisk start



#module load chan_sip.so =>ds -rvvv pour la commande sip show peers