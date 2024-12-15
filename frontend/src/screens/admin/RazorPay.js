// const Razorpay = require('razorpay');
import { Razorpay } from 'razorpay';

const razorpayInstance = new Razorpay({
  key_id: 'YOUR_RAZORPAY_KEY_ID',
  key_secret: 'YOUR_RAZORPAY_KEY_SECRET',
});

module.exports = razorpayInstance;
