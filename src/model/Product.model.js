const mongoose=require('mongoose');


const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required'],
        trime:true
    },
    description:{
        type:String,
        required:[true,'Description is required'],
        trime:true  
    },
    price:{
        type:Number,
        required:[true,'Price is required'],
        trime:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:[true,'Category is required']
    },
    brand:{
        type:String,
        default:'Generic',
        trime:true
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    images: [
      {
        url: String,
        public_id: String,
      },
    ],
    ratings: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
},
  { timestamps: true }
);

productSchema.index({ name: 'text', description: 'text' });
module.exports=mongoose.model('Product',productSchema);