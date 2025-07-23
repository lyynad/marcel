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

    async dropAllDocuments() {
        await this.bookModel.deleteMany({});
        console.log("All documents dropped from the book collection.");
    }

    async crawlTopRated(pages = 2) {
        for (let i = 1; i <= pages; i++) {
            const list = await this.scrapeTopRated(i);
            
            for (const fictionURL of list) {
                await this.scrapeFictionPage(`https://www.royalroad.com${fictionURL}`);
                await new Promise(r => setTimeout(r, 2000));
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

    async scrapeFictionPage(url: string, numberOfSimilarFictions = 3) {
        const fictionId = this.extractFictionId(url);
        
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const title = $('.fic-title h1').text().trim();
        const cover = $('.cover-art-container img').attr("src");
        const description = $(".description p").text().trim();
        const tags = $('.tags .fiction-tag').map((_, el) => $(el).text().trim()).get();

        let similarFictions: Types.ObjectId[] = [];
        if (numberOfSimilarFictions > 0 && fictionId)
            similarFictions = await this.getSimilarFictions(fictionId, numberOfSimilarFictions);
        
        const fictionData = {
            royalroadId: fictionId,
            title: title,
            coverImage: cover,
            description: description,
            royalroadTags: tags,
            scratchers: similarFictions  
        };

        await this.saveOrUpdate(fictionData);
    }

    async saveOrUpdate(fictionData: any) {
        await this.bookModel.updateOne(
            { royalroadId: fictionData.royalroadId },
            { $set: fictionData },
            { upsert: true }
        );

        console.log(`book ${fictionData.title} added with ${fictionData.scratchers.length} references\n`);

    }

    extractFictionId(url: string): string | null {
        const match = url.match(/\/fiction\/(\d+)\//);
        return match ? match[1] : null;
    }

    async getSimilarFictions(fictionId: string, numberOfSimilarFictions: number = 3) {
        const similarUrl = "https://www.royalroad.com/fictions/similar?fictionId=" + fictionId;
        const { data } = await axios.get(similarUrl);

        const mapped = data.slice(0, numberOfSimilarFictions).map(({ id, title, url }) => ({ id, title, url }));

        for (const fiction of mapped) {
            const url = `https://www.royalroad.com${fiction.url}`;
            console.log("-ref");
            await this.scrapeFictionPage(url, 0);
            await new Promise(r => setTimeout(r, 2000));
        }

        const royalroadIds = mapped.map(fic => fic.id);
        const existingBooks = await this.bookModel.find({ royalroadId: { $in: royalroadIds } });
        const ids = existingBooks.map(book => book._id);

        return ids;
    }
}

export { ScrapingService };