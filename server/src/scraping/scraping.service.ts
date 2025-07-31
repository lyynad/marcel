import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Book } from "src/book/book.schema";
import { Types } from "mongoose";
import { RoyalRoadStrategy } from "./strategies/royalroad.strategy";

import * as cheerio from "cheerio";
import axios from "axios";

@Injectable()
class ScrapingService {
    constructor(
        @InjectModel(Book.name) private bookModel: Model<Book>,
        private royalRoadStrategy: RoyalRoadStrategy
    ) {}

    async dropAllDocuments() {
        await this.bookModel.deleteMany({});
        console.log("All documents dropped from the book collection.");
    }

    async runRoyalRoadScraper(pages = 2) {
        this.royalRoadStrategy.scrape(pages);
    }
}

export { ScrapingService };