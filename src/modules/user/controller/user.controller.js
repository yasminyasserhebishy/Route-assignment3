import usermodel from "../../../DB/models/user.model.js"
import productmodel from "../../../DB/models/product.model.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//1-get all users
//find --> users found or no users added in DB 
export const allusers = async(req,res,next)=>{
try {
  const users = await usermodel.find()
  return users.length == 0 ?  res.json({msg:"no users found"}) :  res.json({msg:"done",users})
} catch (error) {
  return res.json({message:"error",errorMessage:error.message, stack:error.stack})

}
}
//2-sign up (email must be unique)
//find by email 
//if not exist --> hash password --> signup
// if exist -->login
export const signup =async (req,res,next)=>{
try {
    const {name,email,password} = req.body
    const userexist = await usermodel.findOne({email})                         
    if(userexist) {
       return res.json({msg:"user already exist, please login"})
} 
const hash = bcrypt.hashSync(password,8)
const sign = await usermodel.create({name,email,password:hash})
return res.json({msg:"user added successfully",sign})
} catch (error) {
  return res.json({message:"error",errorMessage:error.message, stack:error.stack})
}
}
//3-sign in
//find user by email 
//if exist --> compare hash with password entered --> if match --> token --> login
//if not exist --> wrong email or password
export const login = async(req,res,next)=>{
try {
  const{email ,password } = req.body
  const exist = await usermodel.findOne({email})
  if(!exist) {
    return res.json({msg:"wrong email"})
  }
  const match = bcrypt.compareSync(password,exist.password)
if(match){
  const token = jwt.sign({ _id:exist._id , email : exist.email, yasmin :'yasmin'},'yasmin')
  return res.json({msg:"login successfully",token})
}
      return res.json({msg:"wrong password"})
} catch (error) {
  return res.json({message:"error",errorMessage:error.message, stack:error.stack})
}
}
//4-update user
//find user then update
export const updateuser = async(req,res,next)=>{
try {
  const{_id} = req.params
  const {name,age,gender} = req.body 
  const update = await usermodel.findOneAndUpdate({_id},{name,age,gender},{new:true})
  return update ? res.json({msg:"user updated successfully",update}) : res.json({msg:"invalid id "})
} catch (error) {
  return res.json({message:"error",errorMessage:error.message, stack:error.stack})

}
}
//5-delete user
//find user then delete
export const deleteuser = async(req,res,next)=>{
try {
  const{_id} = req.params
  const deleteuser = await usermodel.findOneAndDelete({_id})
  return deleteuser ? res.json({msg:"user deleted successfully"}) : res.json({msg:"invalid id "})

} catch (error) {
  
}
}
//6-search for user where his name contains with "X" and age less than Y, please note that X, Y are variables
export const searchUsers = async (req, res, next) => {
    try {
      const { nameContain, age } = req.body;

      const users = await usermodel.find({
        name: { $regex: `${nameContain}`},
        age: { $lt: `${age}` } 
        });
  
      return users[0] ? res.json({ msg: 'done', users }) : res.json({ msg: 'no users match your codition' })
    } catch (error) {
      return res.json({message:"error",errorMessage:error.message, stack:error.stack})

    }
  }

//7-search for users where their ages are between X and Y
  export const searchbyage = async (req, res, next) => {
    try {
      const { minage , maxage } = req.body;

      const users = await usermodel.find(
        { age: { $gt: `${minage}`, $lte: `${maxage}`} }
);
  
      return users[0] ? res.json({ msg: 'done', users }) : res.json({ msg: 'no users match your condition' })
    } catch (error) {

      return res.json({message:"error",errorMessage:error.message, stack:error.stack})

    }
  }

//8- get all user products
// export const userWproduct = async(req,res,next)=>{
//   const { userId } = req.params;
//   const userWithProducts = await usermodel.findById(userId).populate('products');
//   // console.log(userWithProducts);
//    res.json({msg:"done",userWithProducts})
//  }




