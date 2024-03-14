FROM node:14.14.0-alpine
WORKDIR /app
COPY ./package.json ./
RUN npm config set registry http://registry.npmjs.org/
COPY . .
CMD ["npm", "run", "dev"]
