// routes/swagger.mjs
import { createRequire } from 'module';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const require = createRequire(import.meta.url);
const swaggerDocument = require('../swagger-output.json'); // Usa el archivo generado


const swaggerRouter =  express.Router();

// Configurar Swagger UI
swaggerRouter.use('/', swaggerUi.serve);
swaggerRouter.get('/', swaggerUi.setup(swaggerDocument, {
    explorer: true,
    customSiteTitle: "Library API Documentation"
}));

export default swaggerRouter;