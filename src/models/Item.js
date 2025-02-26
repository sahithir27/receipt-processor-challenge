class Item {
    constructor(shortDescription, price) {
        if (!shortDescription || !shortDescription.trim() || !price){
            throw new Error('The receipt is invalid');
        }
        if (!/^[\w\s\-]+$/.test(shortDescription) || !/^\d+\.\d{2}$/.test(price)) {
            throw new Error('The receipt is invalid');
        }

        this.shortDescription = shortDescription;
        this.price = price;
    }
}
module.exports = { Item };