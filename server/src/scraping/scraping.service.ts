import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Book } from "src/book/book.schema";
import { Types } from "mongoose";

import * as cheerio from "cheerio";
import axios from "axios";

@Injectable()
class ScrapingService {
    constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

    async crawlTopRated(pages = 2) {
        for (let i = 1; i <= pages; i++) {
            const list = await this.scrapeTopRated(i);
            
            for (const fictionURL of list) {
                await this.scrapeFictionPage(`https://www.royalroad.com${fictionURL}`);
                await new Promise(r => setTimeout(r, 1000));
            }
        }
    }    

    async scrapeTopRated(page: number) {
        const url = `https://www.royalroad.com/fictions/best-rated?page=${page}`
        console.log(`scraping url: ${url}`);

        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const fictionUrls = $('.fiction-title a').map((_, el) => $(el).attr("href")).get();

        console.log(`urls received: ${fictionUrls}`);

        return fictionUrls;
    }

    async scrapeFictionPage(url: string) {
        const fictionId = this.extractFictionId(url);
        
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const title = $('.fic-title h1').text().trim();
        const cover = $('.cover-art-container img').attr("src");
        const description = $(".description p").text().trim();
        const tags = $('.tags .fiction-tag').map((_, el) => $(el).text().trim()).get();

        const similarFictions = await this.getSimilarFictions(fictionId);

        let scratchers: Types.ObjectId[] = [];
        if (similarFictions && similarFictions.length) {
            scratchers = await this.getOrCreateScratchers(similarFictions);
        };

        const fictionData = {
            royalroadId: fictionId,
            title: title,
            coverImage: cover,
            description: description,
            royalroadTags: tags,
            scratchers: scratchers  
        };

        console.log(fictionData);

        this.saveOrUpdate(fictionData);
    }

    async saveOrUpdate(fictionData: any) {
        await this.bookModel.updateOne(
            { royalroadId: fictionData.id },
            { $set: fictionData },
            { upset: true }
        );

        console.log(`updated or inserted ${fictionData.title}`);
    }

    async getOrCreateScratchers(similarFictions: any) {
        const royalroadIds = similarFictions.map(fic => fic.id);
        const existingBooks = await this.bookModel.find({ royalroadId: { $in: royalroadIds } });

        const existingIdsSet = new Set(existingBooks.map(book => book.royalroadId));
        const newBooks = similarFictions.filter(fic => !existingIdsSet.has(fic.id));

        if (newBooks.length) {
            await this.bookModel.insertMany(newBooks.map(book => ({
                royalroadId: book.id,
                title: book.title
            })));
        }

        const allBooks = await this.bookModel.find({ royalroadId: { $in: royalroadIds } });
        return allBooks.map(book => book._id);
    }

    extractFictionId(url: string): string | null {
        const match = url.match(/\/fiction\/(\d+)\//);
        return match ? match[1] : null;
    }

    async getSimilarFictions(fictionId: string | null) {
        if (fictionId !== null){
            const url = "https://www.royalroad.com/fictions/similar?fictionId=" + fictionId;
            const { data } = await axios.get(url);

            const mapped = data.map(({ id, title, url }) => ({ id, title, url }));

            console.log(mapped);
            return mapped;
        }
    }
}

export { ScrapingService };