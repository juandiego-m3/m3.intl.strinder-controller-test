FROM ubuntu:18.04

ADD package.json /app/package.json
ADD README.md /app/README.md
ADD cypress.json /app/cypress.json
ADD testcafe /app/testcafe
ADD cypress /app/cypress
ADD puppeteer /app/test

WORKDIR /app

RUN apt-get update
RUN apt-get install xvfb libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 -y
RUN apt-get install nodejs -y
RUN apt-get install npm -y
RUN npm install

CMD npm run test