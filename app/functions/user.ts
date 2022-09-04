import User from "../db/models/user";
import logger from "../logger";


export const saveUser = async (data: any) => {
    const functionName = 'saveUser'
    try {
        const user = await User.create({
            firstName: data.firstName,
            lastName: data.lastName,
        })
        return user

    } catch (err: any) {
        logger.error(`Error for created Bot ${functionName}`)
        throw new Error( err )
    }
}
