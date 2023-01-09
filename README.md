<p align="center">
  <a href="" rel="noopener">
 <img width=600px height=300px src="https://d1y4kmswc4t8ti.cloudfront.net/wp-content/uploads/2022/03/NestJS-on-Kubernetes.png" alt="Project logo"></a>
</p>

<a href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"> Monorepo with Nx</a>

<h3 align="center">Challenge Yapero [Architecture Hexagonal, Dependency Injection, Kafka]</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center">
  Use of NestJs with microservices, broker message Kafka, hexagonal architecture, dependency injection and very good practices.
    <br>
</p>

## 📝 Table of Contents

- [About](#about)
- [Design Database ER](#design_database)
- [Getting Started](#getting_started)
- [Deployment with Docker](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

- [Problem](#problem)
- [Tech Stack](#tech_stack)
- [Send us your challenge](#send_us_your_challenge)

# Problem

Every time a financial transaction is created it must be validated by our anti-fraud microservice and then the same service sends a message back to update the transaction status.
For now, we have only three transaction statuses:

<ol>
  <li>pending</li>
  <li>approved</li>
  <li>rejected</li>  
</ol>

Every transaction with a value greater than 1000 should be rejected.

```mermaid
  flowchart LR
    Transaction -- Save Transaction with pending Status --> transactionDatabase[(Database)]
    Transaction --Send transaction Created event--> Anti-Fraud
    Anti-Fraud -- Send transaction Status Approved event--> Transaction
    Anti-Fraud -- Send transaction Status Rejected event--> Transaction
    Transaction -- Update transaction Status event--> transactionDatabase[(Database)]
```

# Tech Stack

<ol>
  <li>Node. You can use any framework you want (i.e. Nestjs with an ORM like TypeOrm or Prisma) </li>
  <li>Any database</li>
  <li>Kafka</li>    
</ol>

We do provide a `Dockerfile` to help you get started with a dev environment.

You must have two resources:

1. Resource to create a transaction that must containt:

```json
{
  "accountExternalIdDebit": "Guid",
  "accountExternalIdCredit": "Guid",
  "tranferTypeId": 1,
  "value": 120
}
```

2. Resource to retrieve a transaction

```json
{
  "transactionExternalId": "Guid",
  "transactionType": {
    "name": ""
  },
  "transactionStatus": {
    "name": ""
  },
  "value": 120,
  "createdAt": "Date"
}
```

## Optional

You can use any approach to store transaction data but you should consider that we may deal with high volume scenarios where we have a huge amount of writes and reads for the same data at the same time. How would you tackle this requirement?

You can use Graphql;

---

## 💾 Design Database ER <a name = "design_database"></a>

<img width=800px height=400px src="resources/database-design-ER.png" alt="Design Database">

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

Nodejs v.14 or higher

```
node --version
```

### Installing

Configure the .env file using the example file .env.example as a reference

### api-gateway .env

```
PORT=4000
KAFKA_BROKER_URL=localhost:29092
```

### transaction-microservice .env

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/challenge?schema=public"
KAFKA_BROKER_URL="localhost:29092"
```

### anti-fraud-microservice .env

```
KAFKA_BROKER_URL="localhost:29092"
```

Add project dependencies [NPM | YARN]

```

npm install

```

```

yarn

```

## 🚀 Deployment with Docker <a name = "deployment"></a>

```
docker-compose up -d
```

Run the application in development

- Required steps

```
yarn migrate
yarn seed
```

```
nx serve api-gateway
nx serve transaction-microservice
nx serve anti-fraud-microservice
```

If all went well visit the next page

```

localhost:{your_port}/v1/api

```

<img width=800px height=400px src="resources/1.png" alt="Endpoints">

<img width=800px height=400px src="resources/2.png" alt="Endpoints">

## 🔧 Running the tests <a name = "tests"></a>

run the tests

```

npm run test

```

or

```

yarn test

```

## 🎈 Usage <a name="usage"></a>

To view and interact with API REST visit the documentation.

```

localhost:{your_port}/api-docs

```

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

---

## ⛏️ Built Using <a name = "built_using"></a>

- [NodeJs](https://nodejs.org/en/) - Server Environment
- [NestJS](https://docs.nestjs.com/) - Server Framework
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Nx](https://nx.dev/) - Monorepo
- [Kafka](https://kafka.apache.org/) - Message Broker
- [Docker](https://www.docker.com/) - Docker

## ✍️ Authors <a name = "authors"></a>

- [@ArthurDev](https://github.com/ArthurQR98) - Idea & Initial work
