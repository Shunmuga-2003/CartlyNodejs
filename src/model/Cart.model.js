const moonoose = require("mongoose");

const cartSchema = new moonoose.Schema(
    {
        user: {
            type: moonoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        items:[
            {
                product:{
                    type: moonoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity:{
                    type: Number,
                    required: true,
                    min: 1,
                    default: 1,
                },
            },
        ],
    },
    { timestamps: true }
);

module.exports = moonoose.model("Cart", cartSchema);
