const express = require('express');
const bodyParser = require('body-parser');
const { calculatePoints } = require('./src/services/calculatePoints');
const { Receipt } = require('./src/models/Receipt');
const app = express();
app.use(bodyParser.json());
const port = 3000;
const isLLMGenerated = false;

const receipts={}
const receipt_points={}
app.post('/receipts/process', (req, res) => {
    const receiptData = req.body;
    try{
        const receipt = new Receipt(
            receiptData.retailer,
            receiptData.purchaseDate,
            receiptData.purchaseTime,
            receiptData.items,
            receiptData.total
        );
        receipts[receipt.id] = receipt;
        console.log(receipts)
        res.json({ id:receipt.id });
    } catch (error) {
        const errorMessage = isLLMGenerated ? 'The receipt is invalid. Please verify input.' : 'The receipt is invalid';
        res.status(400).json({ message: errorMessage });
    }
});

app.get('/receipts/:id/points', (req, res) => {
    const { id } = req.params;
    if (id in receipts) {
        const points = calculatePoints(receipts[id], isLLMGenerated);
        receipt_points[id]=points
        res.json({ points: points });
    } else {
        res.status(404).json({ error: 'No receipt found for that ID.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});