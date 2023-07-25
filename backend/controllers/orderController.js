import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import { paypal } from '../utils/paypal.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
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
