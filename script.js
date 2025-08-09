AOS.init();

const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Replace with your actual Razorpay key and secret
const razorpay = new Razorpay({
  key_id: 'YOUR_RAZORPAY_KEY',
  key_secret: 'YOUR_RAZORPAY_SECRET'
});

app.post('/create-order', async (req, res) => {
  const { amount, donorName, donationType } = req.body;

  const options = {
    amount: amount,  // amount in paise
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
    payment_capture: 1 // auto capture
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
