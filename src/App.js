import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const thStyle = {
  textAlign: 'left',
  padding: '12px',
  borderBottom: '1px solid #ddd',
  fontWeight: '600',
  fontSize: '15px',
  color: '#333'
};

const tdStyle = {
  padding: '12px',
  borderBottom: '1px solid #eee',
  fontSize: '14px',
  color: '#555',
  verticalAlign: 'top'
};

function App() {
  const [orders, setOrders] = useState([]);
  const prevOrderCount = useRef(0);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/orders`);

      // Check if a new order was added
      if (res.data.length > prevOrderCount.current) {
        const newOrders = res.data.slice(prevOrderCount.current);
        newOrders.forEach(order => {
          toast.success(`New Order Received: #${order.erp_order_id}`, {
            position: "top-right"
          });
        });
      }

      prevOrderCount.current = res.data.length;
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err.message);
      toast.error(" Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();

    // Optional: Poll every 30 seconds (simulate webhook update)
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Shopify ERP Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <thead style={{ backgroundColor: '#f1f1f1' }}>
              <tr>
                <th style={thStyle}>Order ID</th>
                <th style={thStyle}>Customer</th>
                <th style={thStyle}>Total</th>
                <th style={thStyle}>Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.erp_order_id}>
                  <td style={tdStyle}>{order.erp_order_id}</td>
                  <td style={tdStyle}>{order.customer_name || '-'}</td>
                  <td style={tdStyle}>{order.total}</td>
                  <td style={tdStyle}>
                    {order.items.map((item, index) => (
                      <div key={index}>{item.qty} × {item.name}</div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
