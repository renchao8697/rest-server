import * as express from 'express'
import * as mongoose from 'mongoose'

import { Routes } from './routes/routes'
import IMiddleware from './middlewares/interface'

export default class App {
  public app = express()
  public port: number
  public dbUrl: string
  public middlewares: IMiddleware[]
  public routes = new Routes();

  constructor(appInit: {
    port: number,
    dbUrl: string,
    middlewares: IMiddleware[]
  }) {
    this.port = appInit.port
    this.dbUrl = appInit.dbUrl
    this.middlewares = appInit.middlewares

    this.useMiddlewares()

    this.routes.intallRoute(this.app)

    this.mongoInit();
  }

  private useMiddlewares() {
    this.middlewares.forEach(middleware => {
      this.app.use(middleware)
    })
  }

  private mongoInit() {
    mongoose.Promise = global.Promise;
    mongoose.connect(this.dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => {
      console.log('mongoose connected')
    })
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`server listening on port ${this.port}`)
    })
  }
}