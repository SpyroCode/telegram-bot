import express, {Application} from 'express'
import startRoutes from '../app/routes/started'
import cors from 'cors'
import db from "./db/connection";


class Server {

    private app: Application
    private port: string
    private paths = {
        home: '/'
    }

    constructor() {
        this.app = express()
        this.port = process.env.PORT || '8000'
        this.dbConnection()
        this.middlewares()
        this.routes()
        this.starBot()
    }

    async dbConnection() {
        try {
            await db.authenticate()
            console.log('Database online')
        } catch (error: any) {
            throw new Error( error )
        }
    }

    middlewares() {
        this.app.use( cors())
        this.app.use(express.json())
        this.app.use(express.static('app/assets/html/index.html'))
    }

    routes() {
        this.app.get(this.paths.home, startRoutes);
    }

    starBot () {
        console.log('inicia bot')
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`🚀 Server running on PORT ${this.port}`)
        })
    }
}

export default Server
