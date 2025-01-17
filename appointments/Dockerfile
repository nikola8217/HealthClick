FROM node:20

WORKDIR /app/appointments

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5005

CMD ["npm", "start"]