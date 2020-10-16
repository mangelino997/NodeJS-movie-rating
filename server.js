require('dotenv').config();

const app = require('./app');
const { appConfig } = require('./config')

// connect to DB
async function initApp(port) {
    try {
        await require('./db/mongodb');
        app.listen(port, () => console.log(`${port}`))
    } catch (error) {
        console.log(error);
        process.exit(0);
    }

}

initApp(appConfig.port);