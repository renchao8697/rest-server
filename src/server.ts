import * as bodyParser from 'body-parser'
import App from './app'

const port = 4343;
const dbUrl = 'mongodb://localhost/test'
const middlewares = [
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true })
]

let app = new App({
  port,
  dbUrl,
  middlewares
});

app.listen()
