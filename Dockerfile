FROM node:lts-alpine3.20

WORKDIR /app

COPY package.json package-lock.json ./
# install dependencies reproducibly from the patched lockfile
RUN npm ci --legacy-peer-deps
COPY . .

# build
RUN npm run build

EXPOSE 3000
CMD ["npm","run", "start"]