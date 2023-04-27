import ContainerMongoDB from "../containers/ContainerMongoDB.js";
import productSchema from "../schemas/productSchema.js"

class ProductsDAOMongoDB extends ContainerMongoDB {
    constructor (){
        super(productSchema)
    }
}

export default ProductsDAOMongoDB;