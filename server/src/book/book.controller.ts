import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from "./book.schema";
import { PaginationQueryDto } from './dto/pagination-query-dto';

@Controller('/api/books')
class BookController {
    constructor(private readonly bookService: BookService) {}

    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto): Promise<Book[]> {
        return this.bookService.findAll(paginationQuery)
    }

    @Get(':id')
    findOne(@Param("id") id: string): Promise<Book> {
        return this.bookService.findOne(id);
    }
};

export { BookController };