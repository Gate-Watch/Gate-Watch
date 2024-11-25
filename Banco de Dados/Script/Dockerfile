# FROM mysql:latest
# WORKDIR /
# ENV MYSQL_ROOT_PASSWORD = urubu100
# COPY script-gatewatch.sql /docker-entrypoint-initdb.d/
# EXPOSE 3306


FROM node:latest
WORKDIR /Site
COPY Site/package*.json ./
RUN npm install
COPY Site .
EXPOSE 3333
CMD ["npm", "start"]
