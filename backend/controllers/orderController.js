import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import { paypal } from '../utils/paypal.js';

const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const dbProductPrices = await Product.find(
      {
        _id: { $in: orderItems.map((x) => x._id) },
      },
      'price'
    );
    const dbOrderItems = orderItems.map((x) => ({
      ...x,
      product: x._id,
      price: dbProductPrices.find((x) => x._id === x._id).price,
      _id: undefined,
    }));
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);
    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});
const calcPrices = (orderItems) => {
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  // Calculate the items price
  const itemsPrice = addDecimals(
    orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  // Calculate the shipping price
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
  // Calculate the tax price
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  // Calculate the total price
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};
// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

const createPaypalOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    try {
      const paypalOrder = await paypal.createOrder(order.totalPrice);
      res.json(paypalOrder);
    } catch (err) {
      res.status(500);
      throw new Error(err.message);
    }
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

const capturePaypalOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    const { orderID } = req.body;
    try {
      const captureData = await paypal.capturePayment(orderID);
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: captureData.id,
        update_time: captureData.update_time,
        email_address: captureData.payer.email_address,
      };

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } catch (err) {
      res.status(500);
      throw new Error(err.message);
    }
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  getOrders,
  capturePaypalOrder,
  createPaypalOrder,
};
