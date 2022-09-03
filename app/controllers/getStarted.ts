import {Request, Response} from 'express'
import path from 'path'
import logger from '../logger';
export const getStarted = (req: Request, res: Response) => {
    const functionName = 'getStarted'
    logger.info(`started ${functionName}`);
    res.sendFile(path.join(__dirname, '../assets/html/index.html'));
}
