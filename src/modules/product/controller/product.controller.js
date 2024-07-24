import productmodel from "../../../DB/models/product.model.js"
import usermodel from "../../../DB/models/user.model.js"


// 1-get all products
export const allproducts = async(req,res,next)=>{
try {
    const allproducts = await productmodel.find()
    return allproducts.length == 0 ?  res.json({msg:"no products found"}) :  res.json({msg:"done",allproducts})
} catch (error) {
    return res.json({message:"error",errorMessage:error.message, stack:error.stack})

}
}

// 2-add product (make sure that user already exist)
export const addproduct = async(req,res,next)=>{
try {
    const{name, description , price , userId} = req.body 
    const userexist = await usermodel.findById(userId)
    if(! userexist){
        return res.json({msg:"user not found"})
    }
    const product = await productmodel.create({name,description, price ,userId})
    return res.json({msg:"product added successfully ",product})

} catch (error) {
    return res.json({message:"error",errorMessage:error.message, stack:error.stack})

}
}

// 3-delete product (product creator only)
export const deleteproduct = async(req,res,next)=>{
try {
    const {_id} = req.params
    const {userId} = req.body
const product = await productmodel.findById({ _id })  
if(!product){
    return res.json({msg:"product not found"})
}
    if (product.userId == userId){
            const deleteproduct = await productmodel.deleteOne( )
            return res.json({msg:"product deleted successfully"})
        }
        return res.json({msg:"you are not the owner of the product"})
} catch (error) {
    return res.json({message:"error",errorMessage:error.message, stack:error.stack})

}
} 
// 4-update product (product owner only)
export const updateproduct = async(req,res,next)=>{
try {
    const {_id} = req.params
    const {name, price,userId} = req.body
const product = await productmodel.findById({ _id })  
if(!product){
    return res.json({msg:"product not found"})
}
    if (product.userId == userId){
            const updateproduct = await productmodel.updateOne({name, price})
            return res.json({msg:"product deleted successfully"})
        }
        return res.json({msg:"you are not the owner of the product"})
} catch (error) {
    return res.json({message:"error",errorMessage:error.message, stack:error.stack})

}
} 

// 5-get all products with their owner’s information (using populate)
export const productsWoner = async(req,res,next)=>{
try {
    const allproducts = await productmodel.find().populate('userId','name email -_id')
    return res.json({msg:"done",allproducts})
} catch (error) {
    return res.json({message:"error",errorMessage:error.message, stack:error.stack})

}
    }

// 6-sort products descending(By createdAt field)
export const sortProducts = async (req, res, next) => {
try {
    const sortedProducts = await productmodel.find().sort({ createdAt: -1 });

    return res.json({ msg: 'done', products: sortedProducts });
} catch (error) {
    return res.json({message:"error",errorMessage:error.message, stack:error.stack})

}
 
}

