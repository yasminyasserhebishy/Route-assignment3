import userrouter from './modules/user/user.router.js'
import productrouter from './modules/product/product.router.js'
import connection from './DB/connection.js'

const bootstrap = (app, express)=>{
    connection()
    app.use(express.json())
    app.use('/user',userrouter)
    app.use('/product',productrouter)

}

export default bootstrap 