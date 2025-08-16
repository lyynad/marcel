import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BookDocument, Book } from './book.schema';
import { PaginationQueryDto, SearchByReferenceBodyDto, SearchByQueryDto } from './dto/book.dto';

@Injectable()
class BookService {
    constructor(@InjectModel(Book.name) private BookModel: Model<BookDocument>) {}

    async findAll(paginationDto: PaginationQueryDto): Promise<BookDocument[]> {
        const { limit = 10, page = 1 } = paginationDto;

        try {
            return await this.BookModel.find().skip((page - 1) * limit).limit(limit).exec();
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch books', error);
        }
    }

    async findOne(id: string): Promise<BookDocument> {
        try{
            const book = await this.BookModel.findById(id).exec();

            if (!book) {
                throw new InternalServerErrorException(`Book with id ${id} not found`);
            }

            return book;
        } catch (error) {
            throw new InternalServerErrorException(`Failed to fetch book with id ${id}: `, error);
        }
    }

    async findAllWithReferences(): Promise<BookDocument[]> {
        try {
            return await this.BookModel.find({ scratchers: { $exists: true, $ne: [] } });
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch books with references: ', error);
        }
    }

    async searchByReference(body: SearchByReferenceBodyDto): Promise<BookDocument[]> {
        try {
            const references = await this.BookModel.find({ _id: { $in: body.references } });
            const referencedIds = references.flatMap(ref => ref.scratchers);
            const searchResults = await this.BookModel.find({ _id: { $in: referencedIds }});
            return searchResults;
        } catch (error) {
            throw new InternalServerErrorException("Failed to search by reference: ", error);
        }
    }

    async searchByQuery(query: SearchByQueryDto): Promise<BookDocument[]> {
        try {
            const { searchQuery } = query;
            const mongoQuery = [
                {
                    $search: {
                        index: "search_index",
                        autocomplete: {
                            query: searchQuery,
                            path: "title"
                        }
                    }
                },
                {
                    $limit: 5
                }
            ]

            const results = await this.BookModel.aggregate(mongoQuery);

            return results;
        } catch (error) {
            throw new InternalServerErrorException("Failed to fetch by query: ", error);
        }
    }
}

export { BookService };