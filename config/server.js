const app = require('../app')
const connectDB = require('./database')
const cli = require('cli-colors')

const port = process.env.PORT

const server = async () => {
    try {
        await connectDB()
        app.listen(port, () => {console.log(cli.bgGreen(`Server Running on http://localhost:${port}`))})
    } catch (error) {
        console.log(cli.bgRed('Error To Run Server ') + error?.message);
        process.exit(1);
    }
}

server();