import mongoose from 'mongoose'

const connection = async()=>{
    return await mongoose.connect('mongodb://localhost:27017/practice').then(()=>{
console.log("connected to db");
    }).catch(()=>{
console.log("failed to connect to db");
    })
}

export default connection