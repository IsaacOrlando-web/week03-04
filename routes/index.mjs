import express from 'express';
import booksRouter from './booksRoutes.mjs';
import reviewsRouter from './reviewsRoutes.mjs';
import swaggerRouter from './swagger.mjs';

const router = express.Router();

// Usa el router importado correctamente
router.use('/api-docs', swaggerRouter);
router.use('/books', booksRouter);
router.use('/reviews', reviewsRouter);
router.get('/', (req, res) => 
    //#swagger.tags = ['Hello world']
    res.send('Hello World!')
);


export default router;