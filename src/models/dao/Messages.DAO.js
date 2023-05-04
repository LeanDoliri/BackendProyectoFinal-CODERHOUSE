import ContainerMongoDB from "../containers/ContainerMongoDB.js";
import messagesSchema from "../schemas/messagesSchema.js";

class MessagesDAOMongoDB extends ContainerMongoDB {
    constructor (){
        super(messagesSchema)
    }
}

export default MessagesDAOMongoDB;