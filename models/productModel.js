const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Please enter the product name.."]
        },
         quantity: {
            type: Number,
            required : true,
            default : 0,
         },
         price: {
            type: Number,
            required :false,
         },
         image: {
            type : String,
            required : false,
         }
    },
    {
        timestamps : true
    }

)

const Product =  mongoose.model('Product',productSchema);

module.exports =Product;