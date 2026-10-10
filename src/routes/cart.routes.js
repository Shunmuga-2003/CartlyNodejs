const express=require('express');
const router=express.Router();

const {getCart,addToCart,removeFromCart,clearCart}=require('../controllers/cart.controller');
const {protect}=require('../middlewares/auth.mddleware');

const {protect}=require('../middlewares/auth.mddleware');

router.use(protect);
router.get('/', getCart);
router.post('/add', addToCart);
router.delete('/remove/:productId', removeFromCart);
router.delete('/clear', clearCart);

module.exports=router;