FROM node:lts-alpine3.20

WORKDIR /app

COPY package.json ./
# install dependencies
RUN npm install --legacy-peer-deps
COPY . .

# build
RUN npm run build

EXPOSE 3000
CMD ["npm","run", "start"]