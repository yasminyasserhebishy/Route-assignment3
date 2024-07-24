import { Router } from "express"
import {allusers,signup,login,updateuser,deleteuser,searchUsers,searchbyage} from './controller/user.controller.js'
const router = Router()

router.get('/allusers', allusers)
router.post('/signup',signup)
router.post('/login',login)
router.patch('/updateuser/:_id',updateuser)
router.delete('/deleteuser/:_id',deleteuser)
router.get('/searchUsers',searchUsers)
router.get('/searchbyage',searchbyage)
// router.get('/userWproduct/:userId',userWproduct)


export default router