import logger from "../logger";
import {Model} from "sequelize";
import Site from "../db/models/sites";


export const getSites = async ():Promise<any> => {
    const functionName = 'functions.getSites'
    try {
      logger.info(`Started function ${functionName}`)
        const getSites: Model["_attributes"] | null = await Site.findAll({
            attributes: ['code', 'url', 'configuration'],
            where: { active: true, enabled: true}
        })
      return getSites
    } catch (err: any) {
      logger.error(`Error for created Bot ${functionName}`)
      throw new Error( err )
    }
}
