import { ScrapingService } from "./scraping.service";
import { Controller, Get } from "@nestjs/common";

@Controller()
class ScrapingController {
    constructor(private readonly scrapingService: ScrapingService) {};

    @Get("/api/scrape")
    async scrape() {
        this.scrapingService.crawlTopRated(2);
        return { message: "scraping initiated. "};
    }

    @Get("/api/scrape/drop")
    async dropAllDocuments() {
        await this.scrapingService.dropAllDocuments();
        return { message: "All documents dropped from the book collection." };
    }
}

export { ScrapingController };