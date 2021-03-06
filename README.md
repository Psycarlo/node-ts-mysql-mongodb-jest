## Requirements

- Node.js: [Current](https://nodejs.org/en/)
- Docker: [Current](https://www.docker.com/get-started)
- MySQL: [Current](https://mysql.com/downloads/)
- MongoDB: [Current](https://mongodb.com/try/download/community)
- (Optional) [Visual Studio Code](https://code.visualstudio.com/)
- (Optional) [MongoDB Compass](https://www.mongodb.com/try/download/compass)
- (Optional) [MySQL Workbench](https://www.mysql.com/products/workbench/)
- (Optional) [Postman](https://www.postman.com/downloads/)

### VSC Extensions

- [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

Note: Open the `rest.http` file and use it

## Getting Started

### Setup

0. Clone the repository

```
git clone https://github.com/Psycarlo/node-ts-mysql-mongodb-jest.git
```

1. Install the dependencies:

```
npm install
```

2. Add and fill .env.development file based on .env.example

3. Run MySQL, MongoDB and Docker

4. Create MySQL Database and Table

```
CREATE DATABASE <MYSQL_DATABASE>;

USE <MYSQL_DATABASE>;

CREATE TABLE users (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  username VARCHAR(16) NOT NULL,
  email VARCHAR(60) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
```

Note: MYSQL_DATABASE variable available in the .env file
Tip: You can use MySQL Workbench and run the queries there

### Run

Run with watch (nodemon)

```
npm run dev
```

Run without watch

```
npm start
```

### Testing

Run tests:

```
npm test
```

There are more utility scripts in `package.json` like:

```
npm run clean:docker:container
npm run clean:docker:image
npm run clean:docker:volume

npm run compose:docker:down

npm run test:force-recreate
```

Note: Use the AAA Pattern - Arrange, Act, Assert when testing

### Lint & Format

To check for linting warnings and errors:

```
npm run lint
```

Try to fix those:

```
npm run lint:fix
```

To check for formatting warnings and errors:

```
npm run format
```

Try to fix those:

```
npm run format:fix
```

### Clean

To clean docker containers:

```
npm run clean:docker:container
```

To clean docker dangling images:

```
npm run clean:docker:image
```
