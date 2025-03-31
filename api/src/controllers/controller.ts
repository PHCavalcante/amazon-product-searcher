import getItems from "../models/getItemsModel"
import type { Request, Response } from "express";
import type { Item } from "../types/itemType";

interface ListItemsRequest extends Request {
    query: {
        keyword: string;
    };
}
export async function ListItems(req: ListItemsRequest, res: Response): Promise<void> {
    const keyword = req.query.keyword;
    if (!keyword) {
        res.status(400).json({ message: "Missing keyword" });
        return;
    }
    try {
        const items: Item[] = (await getItems(keyword) || []);
        if (items.length === 0) {
            res.status(404).json({ message: "No items found" });
            return;
        }
        res.status(200).json(items);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}