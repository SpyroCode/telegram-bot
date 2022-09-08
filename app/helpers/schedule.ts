import cron from 'node-cron'
import logger from "../logger";

export const scheduleCron = () => {
    const functionName = 'helpers.scheduleCron'
    logger.info(`Started function ${functionName}`)
    try {
        cron.schedule('59 * * * *', () => {
            logger.info(`running a task scraping notification every hour ${functionName}`)
        });
    } catch (err: any) {
        logger.error(`Error for scheduleCron ${functionName}`)
        throw new Error( err )
    }
}
