<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).



#### Notes

```
In the app path
docker build -t reservations -f . ../../
docker tag reservations europe-southwest1-docker.pkg.dev/sleeper-399616/reservations/production
docker image push europe-southwest1-docker.pkg.dev/sleeper-399616/reservations/production
```

### Setup kube secrets
```
kubectl create secret docker-registry gcr-json-key --docker-server=europe-southwest1-docker.pkg.dev --docker-username=_json_key --docker-password="$(cat ../sleeper-399616-b30516f4bfd3.json)"
kubectl patch serviceaccount default -p '{"imagePullSecrets": [{"name":"gcr-json-key"}]}'
```
### create deployment template
```
kubectl create deployment reservations --image=europe-southwest1-docker.pkg.dev/sleeper-399616/reservations/production --dry-run=client -o yaml>deployment.yaml
```

Install
```
helm install sleeper ./helm
# restart
kubectl rollout restart deployment reservations
# describe
kubectl describe pod reservations-5df4567864-vgktm
```
kubectl create deployment reservations --image=europe-southwest1-docker.pkg.dev/sleeper-399616/reservations/production --dry-run=client -o yaml>deployment.yaml

### artifactory repo
```
europe-southwest1-docker.pkg.dev/sleeper-399616/auth
europe-southwest1-docker.pkg.dev/sleeper-399616/notifications
europe-southwest1-docker.pkg.dev/sleeper-399616/payments
europe-southwest1-docker.pkg.dev/sleeper-399616/reservations
```

### kube secrets
```
kubectl create secret generic mongodb --from-literal=connectionString=mongodb+srv://sleeprexercise:L0oWcn8vEIxjRBgN@sleeper.x1idyew.mongodb.net
kubectl create secret generic google --from-literal=clientSecret=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 --from-literal=refreshToken=1//04FXb31Q-y_xVCgYIARAAGAQSNwF-L9IrMiP4IrMWsi80dmjFUYftvT0HipTmoVLsamLn3PyeOzGQLT4wCiWpWcAAjpdCBUrLlTc
kubectl create secret generic stripe --from-literal=apikey=sk_test_51Nrj5BJR7taSez6mOfkB3mtIUQP7LkugMYBlzgn99rXmMnZDGiglzDhSsjULpGBW8RKdPdaspc8waCbjicQ5OPSp00E4OtsVvF 
```
### kube service
```
external ip
kubectl create service nodeport reservations --tcp=3004 --dry-run=client -o yaml > service.yaml
internal ip 
kubectl create service clusterip auth --tcp=3002,3003 --dry-run=client -o yaml > service.yaml
```

### remote cluster
```
kubectl config get-contexts
# select cluster
kubectl config use-context
# create secret
kubectl get secret stripe -o yaml > stripe.yaml
kubectl get secret google -o yaml > google.yaml
kubectl get secret stripeapi -o yaml > stripeapi.yaml
kubectl get secret mongodb -o yaml > mongodb.yaml
# change context and create secrets
kubectl create -f stripe.yaml
```
### replace the Oauth token
```
https://developers.google.com/oauthplayground/
echo -n '1//04D1TSm7QAkbCgYIARAAGAQSNwF-L9IraRVltpVzWwKabtM3MELP7yKd9n5l9xmX4qzAthGJv8fAFA5OG96762b8ppVxSg4PS_g' | base64
kubectl edit secret google
esc dd (delete line)
esc o (add new line)
esc x (save and exit)
kubectl rollout restart deployment notifications
```


```
