FROM node

COPY ./ /app

WORKDIR /app

RUN npm install

# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
# RUN chmod +x /wait

# CMD /wait && npm run test:ci

CMD ["npm", "run", "test:ci"]