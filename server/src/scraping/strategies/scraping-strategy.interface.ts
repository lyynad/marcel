export interface ScrapingStrategy {
    scrape(pages?: number): Promise<void>;
}