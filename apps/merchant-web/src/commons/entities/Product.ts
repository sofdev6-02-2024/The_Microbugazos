import { UUID } from "crypto";
import { Image } from "./Image";
import ProductVariant from "./ProductVariant";

export class Product {

    id: UUID;
    storeId: UUID;
    name: string;
    description: string;
    price: number;
    brand: string;
    images: Array<Image>;
    variants: Map<string, ProductVariant>;

    constructor(id: UUID, storeId: UUID, name: string, description: string, price: number, brand: string, images: Array<Image>, variants: Map<string, ProductVariant>) {
        this.id = id;
        this.storeId = storeId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.brand = brand;
        this.images = images;
        this.variants = variants;
    }
}