## Description

This repository contains the source code for an internship task-4 project. The project is focused on building a web application with user authentication, role management, user profiles, and product management. 

## Tech Stack

Express.js, PostgreSQL, Sequelize, Jest and Supertest for testing

## Installation

To start project

```bash
  docker compose up
  yarn db:migrate
  yarn db:seed:run
```

To run tests, run the following command

```bash
  yarn test
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`= postgres://postgres:example@localhost:5432/task-4-back

`ANOTHER_API_KEY`


    
