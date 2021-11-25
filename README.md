## Requirements

- Node.js: [Current](https://nodejs.org/en/)
- Docker: [Current](https://www.docker.com/get-started)
- MySQL: [Current](https://mysql.com/downloads/)
- MongoDB: [Current](https://mongodb.com/try/download/community)
- (Optional) [Visual Studio Code](https://code.visualstudio.com/)
- (Optional) [MongoDB Compass](https://www.mongodb.com/try/download/compass)
- (Optional) [MySQL Workbench](https://www.mysql.com/products/workbench/)
- (Optional) [Postman](https://www.postman.com/downloads/)

## Getting Started

### Setup

0. Clone the repository

TODO: .env files
TODO: npm install

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

Run and watch tests:

```
npm run test:watch
```

Run tests and output a coverage folder:

```
npm run test:coverage
```

Run tests for ci (jest workers disabled):

```
npm run test:ci
```

TODO: Run Integration tests

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
npm run `format`
```

Try to fix those:

```
npm run `format:fix`
```
