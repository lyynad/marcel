import { Controller, Get, Post, Body } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from "./book.schema";

@Controller('/api/books')
class BookController {
    constructor(private readonly bookService: BookService) {}

    @Get()
    findAll() {
        return this.bookService.findAll()
    }
};

export { BookController };