const asyncHandler = require("../utils/asyncHandler");
const ApiError=require("../utils/ApiError");
const Cart=require("../model/Cart.model");
const Product=require("../model/Product.model");

const getCart=asyncHandler(async(req,res)=>{
    let cart=await Cart.findOne({user:req.user._id}).populate('products.product');
    if(!cart){
        cart=await Cart.create({user:req.user._id,products:[]});
    }   
    res.status(200).json({success:true,data:cart});
});

const addToCart=asyncHandler(async(req,res)=>{
    const {productId,quantity=1}=req.body;
    const product=await Product.findById(productId);
    if(!product || !product.isActive){
        throw new ApiError(404,'Product not found');
    }
    if(product.stock<quantity) throw new ApiError(400,'Not enough stock available');
    let cart=await Cart.findOne({user:req.user._id});
    if(!cart){
        cart=await Cart.create({user:req.user._id,products:[]});
    }
    const existingProduct=cart.products.find((item)=>item.product.toString()===productId);
    if(existingProduct){
        const newQuantity=existingProduct.quantity+quantity;
        if(product.stock<newQuantity) throw new ApiError(400,'Not enough stock available');
        existingProduct.quantity=newQuantity;
    } else {
        cart.products.push({product:productId,quantity});
    }
    await cart.save();
    await cart.populate('products.product');
    res.status(200).json({success:true,data:cart});
});
const removeFromCart=asyncHandler(async(req,res)=>{
    const {productId}=req.body;
    let cart=await Cart.findOne({user:req.user._id});
    if(!cart){
        throw new ApiError(404,'Cart not found');
    }
    cart.items=cart.item.filter((item)=>item.Product.toString()!=productId);
    await cart.save();
    await cart.populate('items.product');
    res.status(200).json({success:true,data:cart});
});
const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) throw new ApiError(404, 'Cart not found');

  cart.items = [];
  await cart.save();

  res.status(200).json({ success: true, data: cart });
});

module.exports={getCart,addToCart,removeFromCart,clearCart};