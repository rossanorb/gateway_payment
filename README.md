

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Create a file ".env" in the project's root with following information:

- SandBox Cielo

    CIELO_MERCHANTID=your_merchantid 
    
    CIELO_MERCHANTKEY=your_merchantkey
    
    CIELO_API_QUERY_URL=https://apiquerysandbox.cieloecommerce.cielo.com.br
    
    CIELO_API_URL=https://apisandbox.cieloecommerce.cielo.com.br
    
    CIELO_PAYMENTID=fa09e9c5-a733-4238-a908-cedce9b14ec3

- Rede

    EREDE_PV=your_pv
    EREDE_TOKEN=your_token
    EREDE_URL=https://api.userede.com.br/desenvolvedores

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

## Documentation
Compodoc is a documentation tool for Angular applications. Since Nest and Angular share similar project and code structures, Compodoc works with Nest applications as well.

### Setup
Setting up Compodoc inside an existing Nest project is very simple. Start by adding the dev-dependency with the following command in your OS terminal:

$ npm i -D @compodoc/compodoc

### Generation
Generate project documentation using the following command (npm 6 is required for npx support). See the official documentation for more options.

$ npm run doc
or
$ yarn doc

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
