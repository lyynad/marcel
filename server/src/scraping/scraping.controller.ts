import { ScrapingService } from "./scraping.service";
import { Controller, Get } from "@nestjs/common";

@Controller()
class ScrapingController {
    constructor(private readonly scrapingService: ScrapingService) {};

    @Get("/api/scrap")
    async scrap() {
        this.scrapingService.crawlTopRated(2);
        return { message: "scraping initiated. "};
    }
}

export { ScrapingController };