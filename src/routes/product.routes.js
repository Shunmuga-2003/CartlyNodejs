const express=require('express')
const router=express.Router();

const{getProducts,getProductById,createProduct,updateProduct,deleteProduct}=require('../controllers/product.controller');

const{protect,authorizedRoles, authorizeRoles}=require('../middlewares/auth.mddleware');

router.get('/',getProducts);
router.get('/:id',getProductById);
router.post('/',protect,authorizedRoles('admin'),createProduct);
router.put('/:id',protect,authorizeRoles('admin'),updateProduct);
router.delete('/:id',protect,authorizeRoles('admin'),deleteProduct);

module.exports=router;