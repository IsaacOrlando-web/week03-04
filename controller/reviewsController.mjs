import express from 'express';
import db from '../db/database.mjs';
import { ObjectId } from 'mongodb';

/**
 * GET /
 * Get all Reviews
 */
export async function getAllReviews(req, res, next) {
    //#swagger.tags = ['Reviews']
    //#swagger.summary = 'Get all reviews'
    //#swagger.description = 'Retrieves a list of all book reviews'
    /* #swagger.responses[200] = {
        description: 'List of reviews retrieved successfully',
        schema: { $ref: '#/definitions/Review' }
    } */
    /* #swagger.responses[500] = {
        description: 'Internal server error',
        schema: { $ref: '#/definitions/Error' }
    } */
    
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
    //#swagger.summary = 'Add a new review'
    //#swagger.description = 'Creates a new book review'
    /* #swagger.parameters['review'] = {
        in: 'body',
        description: 'Review data to add',
        required: true,
        schema: { $ref: '#/definitions/ReviewInput' }
    } */
    /* #swagger.responses[201] = {
        description: 'Review created successfully',
        schema: { $ref: '#/definitions/SuccessMessage' }
    } */
    /* #swagger.responses[400] = {
        description: 'Bad request - missing required fields',
        schema: { $ref: '#/definitions/Error' }
    } */
    /* #swagger.responses[500] = {
        description: 'Internal server error',
        schema: { $ref: '#/definitions/Error' }
    } */
    
    try {
        const review = {
            userId: req.body.userId,
            bookId: req.body.bookId,
            rating: req.body.rating,
            reviewText: req.body.reviewText,
            datePosted: req.body.datePosted || new Date().toISOString()
        };
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
    //#swagger.summary = 'Update a review'
    //#swagger.description = 'Updates an existing review by ID'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Review ID',
        required: true,
        type: 'string'
    } */
    /* #swagger.parameters['review'] = {
        in: 'body',
        description: 'Updated review data',
        required: true,
        schema: { $ref: '#/definitions/ReviewUpdate' }
    } */
    /* #swagger.responses[200] = {
        description: 'Review updated successfully',
        schema: { $ref: '#/definitions/SuccessMessage' }
    } */
    /* #swagger.responses[404] = {
        description: 'Review not found',
        schema: { $ref: '#/definitions/Error' }
    } */
    /* #swagger.responses[500] = {
        description: 'Internal server error',
        schema: { $ref: '#/definitions/Error' }
    } */
    
    try {
        const reviewId = new ObjectId(req.params.id);
        const updatedReview = {
            userId: req.body.userId,
            bookId: req.body.bookId,
            rating: req.body.rating,
            reviewText: req.body.reviewText,
            datePosted: req.body.datePosted || new Date().toISOString()
        };
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
    //#swagger.summary = 'Delete a review'
    //#swagger.description = 'Deletes a review by ID'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Review ID',
        required: true,
        type: 'string'
    } */
    /* #swagger.responses[200] = {
        description: 'Review deleted successfully',
        schema: { $ref: '#/definitions/SuccessMessage' }
    } */
    /* #swagger.responses[404] = {
        description: 'Review not found',
        schema: { $ref: '#/definitions/Error' }
    } */
    /* #swagger.responses[500] = {
        description: 'Internal server error',
        schema: { $ref: '#/definitions/Error' }
    } */
    
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