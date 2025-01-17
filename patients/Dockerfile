FROM node:20

WORKDIR /app/patients

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5004

CMD ["npm", "start"]