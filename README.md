# nodejs-rabbitmq

Implementing RabbitMQ with Node.js and Object-Oriented Design Pattern

## Installation

Use the package manager [npm](https://www.npmjs.com/get-npm) to install nodejs-rabbitmq.

```bash
npm install npm@latest -g
```
Install dependencies:

```bash
npm install
```
Application run script:

```bash
npm run start
```
Run docker image of RabbitMQ with management:

```bash
docker run -d --hostname my-rabbit --name some-rabbit -p 5672:5672 -p 8080:15672 rabbitmq:3-management 
```
Dashboard management:

```bash
http://localhost:8080
```
