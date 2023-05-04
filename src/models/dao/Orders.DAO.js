import ContainerMongoDB from "../containers/ContainerMongoDB.js";
import ordersSchema from "../schemas/ordersSchema.js"

class OrdersDAOMongoDB extends ContainerMongoDB {
    constructor (){
        super(ordersSchema)
    }
}

export default OrdersDAOMongoDB;