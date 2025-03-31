import axios from "axios";
import { JSDOM } from "jsdom";
import type { Item } from "../types/itemType";

export default async function getItems(keyword: string){
    try{
        const response = await axios.get(`https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`,
        {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
            }
        });
        
        const dom = new JSDOM(response.data);
        const document = dom.window.document;

        const products:Item[] = [];
        const items = document.querySelectorAll(".s-main-slot .s-result-item");

        items.forEach((item) => {
            const title = item.querySelector("span.a-size-medium, h2 span")?.textContent?.trim() || "N/A";
            const rating = item.querySelector(".a-icon-star-small")?.textContent?.trim() || "N/A";
            const reviews = item.querySelector(".a-size-small")?.textContent?.trim() || "0";
            const imageUrl = item.querySelector(".s-image")?.getAttribute("src") || "N/A";
            const linkElement = item.querySelector("a");
            const itemUrl = linkElement && linkElement.href? `https://www.amazon.com${linkElement.getAttribute("href")}` : "N/A";

            if ([title, rating, reviews, imageUrl, itemUrl].includes("N/A")) return;
            products.push({title, rating, reviews, imageUrl, itemUrl});            
        })
        return products;
    }catch(error){
        console.log(error);
    }
}
