# Shopify ERP Frontend

A simple React-based frontend that displays orders synced from a Shopify store via a middleware backend. This app shows order details such as customer name, order ID, total price, and item list.

---

## How It Works

- Fetches synced Shopify orders from the backend `/orders` API.
- Displays each order with:
  - Order ID
  - Customer name
  - Item list (name and quantity)
  - Total price
- Uses `axios` for API calls and `react-toastify` for notifications.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/kalyanakarri-teesstide/shopify-frontend.git
cd shopify-frontend 

#### 2. Install Dependencies
npm install

##### 3. Environment Variables
REACT_APP_API_BASE_URL=https://shopify-middleware-e90i.onrender.com
Make sure your backend allows CORS from this domain.


###### 4. Development
npm start
The frontend will be available at http://localhost:3000

##### 5. Deployment
To build for production:
npm run build
Then deploy the build/ folder to any static hosting platform like:
Render Static Site
Netlify
Vercel
GitHub Pages

##### 6. API Endpoint Used
This app expects the backend /orders endpoint to return data in the following format:
[
  {
    "erp_order_id": 5598114381876,
    "customer_name": "Kalyana Karri",
    "items": [
      { "name": "Test Product 1", "qty": 1 }
    ],
    "total": "109.00"
  }
]


##### 7. Notes
Ensure that the backend and frontend origins match or are CORS-compatible.

Orders are only displayed if they've been synced to the backend.

Only displays what is currently returned from the backend /orders array.