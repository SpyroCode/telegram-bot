import cron from 'node-cron'
import logger from "../logger";
import {executeFinderSubscription} from "../functions/subscription";

export const scheduleCron = async () => {
    const functionName = 'helpers.scheduleCron'
    logger.info(`Started function ${functionName}`)
    try {
        cron.schedule('59 * * * *',  async () => {
            logger.info(`running a task scraping notification every hour ${functionName}`)
            await executeFinderSubscription()
            logger.info(`Finished function ${functionName}`)
        });
    } catch (err: any) {
        logger.error(`Error for scheduleCron ${functionName}`)
        throw new Error( err )
    }
}
