const config = {
    appConfig:{
        host: process.env.APP_HOST,
        port: process.env.APP_PORT
    },
    jwtConfig: {
        SECRET_TOKEN: 'miclavedetokens' // el codigo deberia ser mas largo (esto es de prueba)
    }
}

module.exports = config