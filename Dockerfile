FROM node:18-alpine

LABEL version=v1.0.0
LABEL app=clone-twitter-frontend

ENV REACT_APP_API_BASE_URL=http://127.0.0.1:8000
ENV REACT_APP_DOMAIN_BACKEND=127.0.0.1:8000

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]