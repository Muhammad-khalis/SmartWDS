FROM node:lts

WORKDIR /app/back-end

COPY back-end/ .

RUN npm install

EXPOSE 3000

CMD ["node", "src/app.js"]
