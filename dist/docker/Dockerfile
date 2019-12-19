FROM ubuntu:18.04

# Installing prerequisites
RUN apt-get update 
RUN apt-get install -y curl
RUN apt-get install -y lsb-core
# RUN apt-get -y install sudo
# RUN apt-get -y install postgresql postgresql-contrib

# Installing Kong
RUN echo "deb https://kong.bintray.com/kong-deb `lsb_release -sc` main" | tee -a /etc/apt/sources.list
RUN curl -o bintray.key https://bintray.com/user/downloadSubjectPublicKey?username=bintray
RUN apt-key add bintray.key
RUN apt-get update 
RUN apt-get install -y kong

# Configure postgres

# Start Kong
# RUN kong start
# This has to be done outside, as it needs another container running postgres

# Installing Node
RUN curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
RUN apt-get install -y nodejs
