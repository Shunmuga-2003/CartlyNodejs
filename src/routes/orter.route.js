const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/order.controller');
const { protect, authorizeRoles } = require('../middlewares/auth.middleware');

router.use(protect);

router.post('/', placeOrder);
router.get('/my', getMyOrders);
router.get('/admin/all', authorizeRoles('admin'), getAllOrders);
router.put('/:id/status', authorizeRoles('admin'), updateOrderStatus);
router.get('/:id', getOrderById); // keep this LAST — otherwise it'll swallow /my and /admin/all as an :id

module.exports = router;