FROM alpine:3.11 as builder
RUN apk --no-cache add gcc g++ make python nodejs npm

WORKDIR /quizztopia
COPY . .
RUN cd front && npm i
RUN cd server && npm i
RUN cd front && npm run build

FROM alpine:3.11
RUN apk --no-cache add nodejs
WORKDIR /quizztopia
COPY --from=builder /quizztopia/server .

CMD ["node", "index.js"]
