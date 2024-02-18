import {BarcodeData} from "./typed.ts";


export async function getBarcodeData(barcode: string): Promise<BarcodeData | undefined> {
    let response;

    try {
        response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    } catch (e) {
        return undefined;
    }

    const data = await response.json();

    if (data.status === 0) {
        return undefined;
    }

    return data as BarcodeData;
}