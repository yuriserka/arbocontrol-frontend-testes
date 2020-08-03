FROM ubuntu:20.04

RUN \
    apt update -y && \
    apt upgrade -y && \
    apt install gnupg2 curl wget -y && \
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list && \
    apt update -y && \
    apt install -y google-chrome-stable && \
    rm -rf /var/lib/apt/lists/*

FROM openjdk:latest
FROM node:latest

WORKDIR /usr/app

COPY package.json ./

RUN yarn

COPY . .
