import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ScrapingService } from "./scraping.service";
import { ScrapingController } from "./scraping.controller";
import { Book, BookSchema } from "src/book/book.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Book.name,
            schema: BookSchema
        }])
    ],
    controllers: [ScrapingController],
    providers: [ScrapingService]
})
export class ScrapingModule {};