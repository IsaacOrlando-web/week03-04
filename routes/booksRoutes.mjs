import express from 'express';
import { getAllBooks, addBook, updateBook, deleteBook } from '../controller/booksController.mjs';


const booksRouter = express.Router();

/**
 * #swagger.tags = ['Books']
 * #swagger.summary = 'Get all books'
 * #swagger.description = 'Retrieves a list of all books in the library'
 * #swagger.responses[200] = {description: 'List of books', schema: { type: 'array', items: { $ref: '#/definitions/Book' } } }
 */
booksRouter.get('/', getAllBooks);

/**
 * #swagger.tags = ['Books']
 * #swagger.summary = 'Add a new book'
 * #swagger.description = 'Creates a new book in the library'
 * #swagger.parameters['body'] = {in: 'body', schema: { $ref: '#/definitions/BookInput' } }
 * #swagger.responses[201] = {description: 'Book created successfully'}
 */
booksRouter.post('/', addBook);

/**
 * #swagger.tags = ['Books']
 * #swagger.summary = 'Update a book'
 * #swagger.description = 'Updates an existing book by ID'
 * #swagger.parameters['id'] = {description: 'Book ID', required: true}
 * #swagger.parameters['body'] = {in: 'body', schema: { $ref: '#/definitions/BookInput' } }
 * #swagger.responses[200] = {description: 'Book updated successfully'}
 */
booksRouter.put('/:id', updateBook);

/**
 * #swagger.tags = ['Books']
 * #swagger.summary = 'Delete a book'
 * #swagger.description = 'Deletes a book by ID'
 * #swagger.parameters['id'] = {description: 'Book ID', required: true}
 * #swagger.responses[200] = {description: 'Book deleted successfully'}
 */
booksRouter.delete('/:id', deleteBook);

export default booksRouter;