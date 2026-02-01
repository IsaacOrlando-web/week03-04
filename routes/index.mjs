import express from 'express';
import booksRouter from './booksRoutes.mjs';
import reviewsRouter from './reviewsRoutes.mjs';
import swaggerRouter from './swagger.mjs';
import { ensureLoggedIn } from 'connect-ensure-login';
import passport from 'passport';
import { ensureAuth, ensureGuest } from '../middleware/auth.mjs';

const router = express.Router();


router.use('/api-docs' , ensureAuth , swaggerRouter);
router.use('/books', ensureAuth ,booksRouter);
router.use('/reviews', ensureAuth ,reviewsRouter);

router.get('/', (req, res) => 
    //#swagger.tags = ['Hello world']
    res.send('Hello World!')
);


export default router;