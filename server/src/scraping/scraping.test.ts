import axios from "axios";
import * as cheerio from "cheerio";

async function testScrapingListPage() {
    const url =  "https://www.royalroad.com/fictions/best-rated";

    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const fictionUrls = $('.fiction-title a').map((_, el) => $(el).attr("href")).get();

    console.log("urls: ", fictionUrls);
}

async function testScrapingFictionPage() {
    const url = "https://www.royalroad.com/fiction/63759/super-supportive";
    const fictionId = extractFictionId(url);

    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const title = $('.fic-title h1').text().trim();
    const cover = $('.cover-art-container img').attr("src");
    const description = $(".description p").text().trim();
    const tags = $('.tags .fiction-tag').map((_, el) => $(el).text().trim()).get();

    const recommended = getSimilarBooks(fictionId);
    
    console.log("Id: ", fictionId);
    console.log("Title: ", title);
    console.log("Cover: ", cover);
    console.log("Description: ", description);
    console.log("Tags: ", tags);
}

function extractFictionId(url: string): string | null {
    const match = url.match(/\/fiction\/(\d+)\//);
    return match ? match[1] : null;
}

async function getSimilarBooks(fictionId: string | null) {
    if (fictionId !== null){
        const url = "https://www.royalroad.com/fictions/similar?fictionId=" + fictionId;
        const { data } = await axios.get(url);

        const mapped = data.map(({ id, url }) => ({ id, url }));

        console.log(mapped);
        return mapped;
    }
}

testScrapingFictionPage();