import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './book.schema';
import { PaginationQueryDto } from './dto/pagination-query-dto';

@Injectable()
class BookService {
    constructor(@InjectModel(Book.name) private BookModel: Model<Book>) {}

    async findAll(paginaionDto: PaginationQueryDto): Promise<Book[]> {
        const { limit = 10, page = 1 } = paginaionDto;

        return await this.BookModel.find().skip((page - 1) * limit).limit(limit)
            .exec()
            .then(books => {
                console.log(books);
                return books;
            })
            .catch(err => {
                console.log(err);
                return err;
            });
    }
}

export { BookService };