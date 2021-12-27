FROM node:15-alpine as AngularBuild
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run ng -- build --configuration=production

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=AngularBuild /usr/src/app/dist/GrillBotClient /usr/share/nginx/html
