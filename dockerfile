FROM node:14

WORKDIR /source/billelind

COPY server/package*.json ./

RUN npm install

COPY server ./

EXPOSE 3000

RUN ls -l 

CMD ["npm", "start"]