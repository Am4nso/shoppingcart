export interface Item {
    barcode: string;
    imageUrl: string;
    name: string;
    price: number;
    quantity?: number;
}

export interface BarcodeData {
    product: {
        product_name: string;
        image_url: string;
    };
    code: string;
}