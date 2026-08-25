const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        namea:{
            type:String,
            required:[true,'Name is required'],
            trim:true,
        },
        slug:{
            type:String,
            required:[true,'Slug is required'],
            unique:true,
            lowercase:true,
            trim:true,
        },
    },
    { timestamps: true }
);

module.exports=mongoose.model('Category',categorySchema);
