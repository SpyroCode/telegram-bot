import { Router} from "express";
import {getStarted} from "../controllers/getStarted";

const router = Router()

router.get('/', getStarted)

export default router
