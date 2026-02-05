import express from 'express';
import db from '../db/database.mjs';
import { ObjectId } from 'mongodb';

export async function getAllReviews(req, res, next) {
    //#swagger.tags = ['Reviews']
    try {
        let collection = await db.collection('reviews');
        let reviews = await collection.find({}).toArray();
        res.send(reviews).status(200);
    } catch (e) {
        next(e);
    }
}

// Add Review
export async function addReview(req, res) {
    //#swagger.tags = ['Reviews']
    try {
        const review = {
            userId: req.body.userId,
            bookId: req.body.bookId,
            rating: req.body.rating,
            reviewText: req.body.reviewText,
            datePosted: req.body.datePosted || new Date().toISOString()
        };
        
        // Validación
        if (!review.userId || !review.bookId || review.rating === undefined || !review.reviewText) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                details: 'Please provide userId, bookId, rating, and reviewText'
            });
        }
        
        if (typeof review.rating !== 'number' || review.rating < 1 || review.rating > 5) {
            return res.status(400).json({ 
                error: 'Invalid rating',
                details: 'Rating must be a number between 1 and 5'
            });
        }
        
        const response = await db.collection('reviews').insertOne(review);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Review added successfully', insertedId: response.insertedId });
        } else {
            res.status(500).json({ error: 'Some error occurred while adding the review.' });
        }
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Some error occurred while adding the review.' });
    }
}

// Update Review
export async function updateReview(req, res) {
    //#swagger.tags = ['Reviews']
    try {
        const reviewId = new ObjectId(req.params.id);
        const updatedReview = {
            userId: req.body.userId,
            bookId: req.body.bookId,
            rating: req.body.rating,
            reviewText: req.body.reviewText,
            datePosted: req.body.datePosted || new Date().toISOString()
        };
        
        // Validación
        if (!updatedReview.userId || !updatedReview.bookId || updatedReview.rating === undefined || !updatedReview.reviewText) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                details: 'Please provide userId, bookId, rating, and reviewText'
            });
        }
        
        if (typeof updatedReview.rating !== 'number' || updatedReview.rating < 1 || updatedReview.rating > 5) {
            return res.status(400).json({ 
                error: 'Invalid rating',
                details: 'Rating must be a number between 1 and 5'
            });
        }
        
        const response = await db.collection('reviews').replaceOne({ _id: reviewId }, updatedReview);
        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Review updated successfully' });
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ error: 'Some error occurred while updating the review.' });
    }
}

// Delete Review
export async function deleteReview(req, res) {
    //#swagger.tags = ['Reviews']
    try {
        const reviewId = new ObjectId(req.params.id);
        const response = await db.collection('reviews').deleteOne({ _id: reviewId });
        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Review deleted successfully' });
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ error: 'Some error occurred while deleting the review.' });
    }
}