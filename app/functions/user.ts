import User from "../db/models/user";
import logger from "../logger";

type User = {
    firstName: string,
    lastName: string,
    index: number | null
    id: string
}

export const getUser = async (data: any) => {
    const functionName = 'saveUser'
    try {
        const user: User = {
            firstName: '',
            lastName: '',
            index: null,
            id: ''
        }
        let response : any
        response = await validateUserExist(data, user)
        if (response && !response.index) {
            response = await User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                index: await generateUserIndex()
            })
        }
        user.id = response.id || ''
        user.index = response.index || null
        user.firstName = response.firstName || ''
        user.lastName = response.lastName || ''
        return user
    } catch (err: any) {
        logger.error(`Error for created Bot ${functionName}`)
        throw new Error( err )
    }
}

async function validateUserExist (data: any, user: User){
    const response: any = await User.findOne({
        where: {
            active: true,
            firstName: data.firstName,
            lastName: data.lastName,
        }
    })
    user.id = response && response.id || ''
    user.index = response && response.index || null
    user.firstName = response && response.firstName || ''
    user.lastName = response && response.lastName || ''
    return user
}

async function generateUserIndex () {
    const functionName = 'generateUserIndex'
    try {
        const { count } = await User.findAndCountAll({ where: { active: true}})
        return  count + 1
    } catch (err: any) {
        logger.error(`Error for generateUserIndex ${functionName}`)
        throw new Error( err )
    }
}
