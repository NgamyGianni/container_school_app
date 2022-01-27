FROM node:17-alpine AS builder
WORKDIR /usr/src/app
COPY . .
RUN npm install &&\
npm run build
FROM nginx:alpine
COPY --from=builder /usr/src/app/dist/backoffice /usr/share/nginx/html
EXPOSE 70
