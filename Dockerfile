FROM node:14.16.1 as builder
WORKDIR /app
COPY . ./
RUN yarn run build

# production env
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

