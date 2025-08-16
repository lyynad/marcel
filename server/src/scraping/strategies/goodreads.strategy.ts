import { Injectable } from "@nestjs/common";
import { ScrapingStrategy } from "./scraping-strategy.interface";
import * as cheerio from "cheerio";
import axios from "axios";
import { InjectModel } from "@nestjs/mongoose";
import { BookDocument, Book } from "src/book/book.schema";
import { Model, Types } from "mongoose";

@Injectable()
class GoodreadsStrategy {
    constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

    
}