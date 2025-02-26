# receipt-processor-challenge

## 🚀 Features
- Submit a receipt and receive a unique ID.
- Retrieve the points awarded to a submitted receipt.
- In-memory data storage (no external database required).
- Built with **Node.js** and containerized using **Docker**.

---

## 🛠️ Prerequisites
- **Docker** installed ([Get Docker](https://docs.docker.com/get-docker/))

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository_url>
```
```bash
cd RECEIPT-PROCESSOR-CHALLENGE
```

### 2. Build the Docker Image
```bash
docker build -t receipt-processor .
```

### 3. Run the Docker Container
```bash
docker run -p <PORT>:3000 receipt-processor
```

### 4. Test the API

#### 🟢 Submit a Receipt
```bash
curl -X POST http://localhost:<PORT>/receipts/process \
    -H "Content-Type: application/json" \
    -d '{
        "retailer": "Target",
        "purchaseDate": "2022-01-02",
        "purchaseTime": "13:13",
        "total": "1.25",
        "items": [
            {"shortDescription": "Pepsi - 12-oz", "price": "1.25"}
        ]
    }'
```

#### 🔍 Get Points for a Receipt
```bash
curl -X GET http://localhost:<PORT>/receipts/{id}/points
```
Replace PORT with **PORT** and **`{id}`** with the **UUID** returned from the **POST** request.

Flag **isLLMGenerated** is set to false in app.js, Change it to true in app.js to verify
