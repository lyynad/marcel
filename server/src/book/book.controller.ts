import { Controller, Get, Post, Body, Query, Param, Req } from '@nestjs/common';
import { BookService } from './book.service';
import { Book, BookDocument } from "./book.schema";
import { PaginationQueryDto, SearchByReferenceBodyDto, SearchByQueryDto } from './dto/book.dto';


@Controller('/api/books')
class BookController {
    constructor(private readonly bookService: BookService) {}

    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto): Promise<BookDocument[]> {
        return this.bookService.findAll(paginationQuery)
    }

    @Get('/scratchers')
    findAllWithReferences(): Promise<BookDocument[]> {
        return this.bookService.findAllWithReferences();
    }

    @Get('/:id')
    findOne(@Param("id") id: string): Promise<BookDocument> {
        return this.bookService.findOne(id);
    }

    @Post('/search-by-reference')
    searchByReference(@Body() body: SearchByReferenceBodyDto) {
        return this.bookService.searchByReference(body);
    }

    @Get("/search-by-query")
    searchByQuery(@Query() query: SearchByQueryDto) {
        return this.bookService.searchByQuery(query);
    }
};

export { BookController };