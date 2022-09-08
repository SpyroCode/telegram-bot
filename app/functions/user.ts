import User from "../db/models/user";
import logger from "../logger";
import { User as UserType } from "../interface/definitionTypes";

export const getUser = async (data: any) => {
    const functionName = 'functions.getUser'
    try {
        logger.info(`Started function ${functionName}`)
        const user: UserType = {
            firstName: '',
            lastName: '',
            telegramId: null,
            index: null,
            id: ''
        }
        let response : any
        response = await validateUserExist(data, user)
        if (response && !response.index) {
            response = await User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                telegramId: data.telegramId,
                index: await generateUserIndex()
            })
        }
        user.id = response.id || ''
        user.index = response.index || null
        user.telegramId = response.telegramId || null
        user.firstName = response.firstName || ''
        user.lastName = response.lastName || ''
        return user
    } catch (err: any) {
        logger.error(`Error for created Bot ${functionName}`)
        throw new Error( err )
    }
}

async function validateUserExist (data: any, user: UserType){
    const functionName = 'functions.generateUserIndex'
    try {
        const response: any = await User.findOne({
            where: {
                active: true,
                telegramId: data.telegramId
            }
        })
        user.id = response && response.id || ''
        user.index = response && response.index || null
        user.firstName = response && response.firstName || ''
        user.lastName = response && response.lastName || ''
        return user
    } catch (err: any) {
        logger.error(`Error for validateUserExist ${functionName}`)
        throw new Error( err )
    }
}

async function generateUserIndex () {
    const functionName = 'functions.generateUserIndex'
    try {
        const { count } = await User.findAndCountAll({ where: { active: true}})
        return  count + 1
    } catch (err: any) {
        logger.error(`Error for generateUserIndex ${functionName}`)
        throw new Error( err )
    }
}
