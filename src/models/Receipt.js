const { v4: uuidv4 } = require('uuid');
const { Item } = require('./Item');
class Receipt {
    constructor(retailer, purchaseDate, purchaseTime, items, total) {
        if (!retailer || !retailer.trim() || !purchaseDate || !purchaseTime || !items || !total){
            throw new Error('The receipt is invalid');
        }
        if (!/^[\w\s\-&]+$/.test(retailer) ||
            !isValidDate(purchaseDate) ||
            !isValidTime(purchaseTime) ||
            !/^\d+\.\d{2}$/.test(total) ||
            !Array.isArray(items) || items.length < 1) {
            throw new Error('The receipt is invalid');
        }

        this.id = uuidv4()
        this.retailer = retailer;
        this.purchaseDate = purchaseDate;
        this.purchaseTime = purchaseTime;
        this.items = items.map(item => new Item(item.shortDescription, item.price));
        this.total = total;
    }
}

function isValidTime(time) {
    if (!/^\d{2}:\d{2}$/.test(time)) {
        return false;
    }
    const [hour, minute] = time.split(':').map(Number);

    return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
}

function isValidDate(date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return false;
    }
    const [year, month, day] = date.split('-').map(Number);
    const dateObj = new Date(Date.UTC(year, month - 1, day));

    return (
        dateObj instanceof Date &&
        !isNaN(dateObj) &&
        dateObj.getUTCFullYear() === year &&
        dateObj.getUTCMonth() === month - 1 &&
        dateObj.getUTCDate() === day
    );
}

module.exports = { Receipt };