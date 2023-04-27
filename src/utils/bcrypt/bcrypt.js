import bcrypt from "bcrypt";

/*----------- bcrypt -----------*/
export async function generateHashPassword(password) {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
}

export async function verifyPassword(user, password) {
    const match = await bcrypt.compare(password, user.password);
    return match;
}
