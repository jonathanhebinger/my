FROM node:16-alpine
WORKDIR /app
COPY ./dist/apps/express .
COPY package.json package-lock.json ./
ENV PORT=5000
EXPOSE ${PORT}
RUN npm install --production
CMD node ./main.js
