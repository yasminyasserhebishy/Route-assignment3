import { Schema, model,Types } from "mongoose"

const productschema = new Schema ({
    name :{
        type : String,
        required : true
    },
    description :{
        type : String,
        required : true,
    },
    price : {
        type : Number ,
        required : true,
    },
    userId :{
        type : Types.ObjectId,
        required:true,
        ref:'User'

    }
}, {timestamps:true})

const productmodel = model('Product', productschema)

export default productmodel 

