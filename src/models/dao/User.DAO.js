import ContainerMongoDB from "../containers/ContainerMongoDB.js";
import userSchema from "../schemas/userSchema.js"

class UserDAOMongoDB extends ContainerMongoDB {
    constructor (){
        super(userSchema)
    }
}

export default UserDAOMongoDB;