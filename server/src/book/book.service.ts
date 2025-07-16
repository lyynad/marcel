import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './book.schema';

@Injectable()
class BookService {
    constructor(@InjectModel(Book.name) private BookModel: Model<Book>) {}

    async findAll(): Promise<Book[]> {
        return await this.BookModel.find().exec()
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