import { Router } from "express"
import {addproduct,allproducts,deleteproduct, updateproduct,productsWoner,sortProducts} from './controller/product.controller.js'
const router = Router()


router.get('/allproducts', allproducts)
router.post('/addproduct',addproduct)
router.delete('/deleteproduct/:_id',deleteproduct)
router.patch('/updateproduct/:_id',updateproduct)
router.get('/productsWoner',productsWoner)
router.post('/sortProducts',sortProducts)


export default router