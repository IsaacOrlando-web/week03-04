import express from 'express';
import { getAllBooks, addBook, updateBook, deleteBook } from '../controller/booksController.mjs';


const booksRouter = express.Router();

booksRouter.get('/', getAllBooks);

booksRouter.post('/', addBook);


booksRouter.put('/:id', updateBook);


booksRouter.delete('/:id', deleteBook);

export default booksRouter;