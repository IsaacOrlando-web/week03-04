import { title } from 'process';
import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Library API',
        description: 'Description',
    },
    host: 'week03-04.onrender.com',
    schemes: ['http', 'https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.mjs'];

swaggerAutogen(outputFile, endpointsFiles, doc);