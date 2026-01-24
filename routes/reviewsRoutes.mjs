import express from 'express';
import { getAllReviews, addReview, updateReview, deleteReview } from '../controller/reviewsController.mjs';

const reviewsRouter = express.Router();


reviewsRouter.get('/', getAllReviews);

reviewsRouter.post('/', addReview);


reviewsRouter.put('/:id', updateReview);

reviewsRouter.delete('/:id', deleteReview);

export default reviewsRouter;