import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './book.schema';
import { PaginationQueryDto } from './dto/pagination-query-dto';

@Injectable()
class BookService {
    constructor(@InjectModel(Book.name) private BookModel: Model<Book>) {}

    async findAll(paginaionDto: PaginationQueryDto): Promise<Book[]> {
        const { limit = 10, page = 1 } = paginaionDto;

        try {
            return await this.BookModel.find().skip((page - 1) * limit).limit(limit).exec();
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch books', error);
        }
    }

    async findOne(id: string): Promise<Book> {
        try{
            const book = await this.BookModel.findById(id).exec();

            if (!book) {
                throw new InternalServerErrorException(`Book with id ${id} not found`);
            }

            return book;
        } catch (error) {
            throw new InternalServerErrorException(`Failed to fetch book with id ${id}`, error);
        }
    }
}

export { BookService };