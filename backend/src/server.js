import 'dotenv/config'
import App from './app.js'

const app = new App().server

app.listen(process.env.PORT)
