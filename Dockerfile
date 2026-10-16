FROM node:20-bookworm-slim
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force
COPY server.js ./server.js
COPY public ./public
COPY bootstrap-admin.js ./bootstrap-admin.js
COPY bootstrap-regu.js ./bootstrap-regu.js
RUN mkdir -p /data && chown -R node:node /app /data
USER node
ENV PORT=3000
ENV DB_PATH=/data/sikap-pas.sqlite
EXPOSE 3000
CMD ["npm", "start"]
