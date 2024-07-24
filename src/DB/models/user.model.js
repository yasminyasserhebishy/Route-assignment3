import { Schema, model,Types } from "mongoose"

const userschema = new Schema ({
    name :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true,
        unique: true
    },
    password :{
        type : String,
        required : true
    },
    age : Number ,
    gender :{
        type : String,
        enum : ["female","male"],
        default :"male"
    },
    phone : String ,
    // products :[{
    //     type : Types.ObjectId,
    //     ref:'Product'
    // }]
},{timestamps:true})

const usermodel = model('User', userschema)

export default usermodel 

 