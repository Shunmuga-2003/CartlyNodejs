const express=require('express');
const router=express.Router();


const{
    getCategories,
    createCategories,
    deleteCategories,
}=require('../controllers/category.controller');
const {protect,authorizedRoles}=require('../middlewares/auth.middleWare');

router.get('/',getCategories);
router.post('/',protecct,authorizedRoles('admin'),createCategories);
router.delete('/:id',protect,authorizedRoles('admin'),deleteCategories);

module.exports=router;