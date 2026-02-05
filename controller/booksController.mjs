import express from 'express';
import db from '../db/database.mjs';
import { ObjectId } from 'mongodb';
import swaggerAutogen from 'swagger-autogen';

async function getAllBooks(req, res, next) {
    //#swagger.tags = ['Books']
    try {
        let collection = await db.collection('books');
        let books = await collection.find({}).toArray();
        res.send(books).status(200);
    }catch(e) {
        next(e);
    }
    
}

// En la función addBook, actualizar el try-catch:
async function addBook(req, res, next) {
    //#swagger.tags = ['Books']
    try {
        const book = {
            title: req.body.title,
            author: req.body.author,
            isbn: req.body.isbn,
            genre: req.body.genre ? (Array.isArray(req.body.genre) ? req.body.genre : [req.body.genre]) : [],
            publicationYear: req.body.publicationYear,
            publisher: req.body.publisher,
            pageCount: req.body.pageCount,
            description: req.body.description,
            averageRating: req.body.averageRating,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        // Validación
        if (!book.title || !book.author) {
            return res.status(400).json({ 
                error: 'Title and author are required',
                details: 'Please provide both title and author fields'
            });
        }
        
        let collection = await db.collection('books');
        let result = await collection.insertOne(book);
        
        if (result.acknowledged) {
            res.status(201).json({
                message: 'Book added successfully',
                insertedId: result.insertedId
            });
        } else {
            res.status(500).json({ 
                error: 'Failed to add book to database' 
            });
        }
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ 
            error: 'Some error occurred while adding the book.',
            details: error.message 
        });
    }
}

// En la función updateBook:
async function updateBook(req, res) {
    //#swagger.tags = ['Books']
    try {
        const bookId = new ObjectId(req.params.id);
        const updatedBook = {
            title: req.body.title,
            author: req.body.author,
            isbn: req.body.isbn,
            genre: req.body.genre ? (Array.isArray(req.body.genre) ? req.body.genre : [req.body.genre]) : [],
            publicationYear: req.body.publicationYear,
            publisher: req.body.publisher,
            pageCount: req.body.pageCount,
            description: req.body.description,
            averageRating: req.body.averageRating,
            updatedAt: new Date()
        };
        
        // Validación
        if (!updatedBook.title || !updatedBook.author) {
            return res.status(400).json({ 
                error: 'Title and author are required',
                details: 'Please provide both title and author fields'
            });
        }
        
        const response = await db.collection('books').replaceOne({ _id: bookId}, updatedBook);
        if (response.modifiedCount > 0) {
            res.status(200).json({ 
                message: 'Book updated successfully',
                modifiedCount: response.modifiedCount
            });
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ 
            error: 'Some error occurred while updating the book.',
            details: error.message
        });
    }
}

// En la función deleteBook:
async function deleteBook(req, res){
    //#swagger.tags = ['Books']
    try {
        const bookId = new ObjectId(req.params.id);
        const response = await db.collection('books').deleteOne({ _id: bookId });
        if (response.deletedCount > 0) {
            res.status(200).json({ 
                message: 'Book deleted successfully',
                deletedCount: response.deletedCount
            });
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ 
            error: 'Some error occurred while deleting the book.',
            details: error.message
        });
    }
}

export { getAllBooks, addBook , updateBook, deleteBook};