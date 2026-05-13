export class Helper{


   static convertPriceToNumber(price: string): number {
        return Number(price.replace(/[^0-9.]/g, ''));
    }

}