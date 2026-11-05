FROM node:20-alpine

WORKDIR /app

COPY package.json index.mjs core.gz README.md LICENSE ./

CMD ["node", "index.mjs"]

