import ContainerMongoDB from "../containers/ContainerMongoDB.js";
import cartSchema from "../schemas/cartSchema.js"

class CartDAOMongoDB extends ContainerMongoDB {
    constructor (){
        super(cartSchema)
    }
}

export default CartDAOMongoDB;