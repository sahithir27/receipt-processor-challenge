function calculatePoints(receipt, isLLMGenerated=false){
    let points=0
    const { retailer, purchaseDate, purchaseTime, items, total } = receipt
    points+=retailer.replace(/[^a-zA-Z0-9]/g, '').length
    if(total%1==0){
        points+=50
    }
    if(total%0.25==0){
        points+=25
    }
    points+=Math.floor(items.length/2)*5
    items.forEach(item=>{
        const {shortDescription, price} = item
        if(shortDescription.trim().length%3==0){
            points+=Math.ceil(price*0.2)
        }
    })
    if (isLLMGenerated && parseFloat(total) > 10.00) {
        points += 5;
    }
    if(new Date(purchaseDate).getDay()%2!=0){
        points+=6
    }
    const [hour, minute] = purchaseTime.split(':').map(Number);
    if((hour==14 && minute>0) || (hour==3 && minute<60)){
        points+=10
    }
    return points
}
module.exports = { calculatePoints };