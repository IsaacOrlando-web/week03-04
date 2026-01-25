import { title } from 'process';
import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Library API',
        description: 'Description',
    },
    host: 'localhost:3000',
    schemes: ['http', 'https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.mjs'];

swaggerAutogen(outputFile, endpointsFiles, doc);