import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  getOrders,
  capturePaypalOrder,
  createPaypalOrder,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);

router.route('/:id/create-paypal-order').post(protect, createPaypalOrder);
router.route('/:id/capture-paypal-order').post(protect, capturePaypalOrder);

router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;
