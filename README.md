# quizzTopia

## Project setup
```
npm i
```

## Launch dev
```
npm run serve
```

## Build
```
npm run build
```
Front build into ```server/public``` folder

## Build docker
```
docker build -t quizztopia .
```
then run with 

## Update and import quizz
``` mongodbURL=<your mongo url> npm run updateQuizz```

## Import only quizz
``` mongodbURL=<your mongo url> npm run import```