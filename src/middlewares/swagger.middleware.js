require('dotenv').config();
const basicAuth = require('express-basic-auth');


if (!process.env.SWAGGER_USERNAME || !process.env.SWAGGER_PASSWORD) {
    throw new Error('SWAGGER_USERNAME or SWAGGER_PASSWORD not set in .env');
}

const swaggerAuth = basicAuth({
    users: { [process.env.SWAGGER_USERNAME]: process.env.SWAGGER_PASSWORD },
    challenge: true,
    realm: 'Swagger UI',
});

module.exports = swaggerAuth;
