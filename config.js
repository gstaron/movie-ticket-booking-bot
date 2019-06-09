if (process.env.NODE_ENV !== 'production') {
    // load environment variables
    require('dotenv').config();
}

module.exports = {
    luisAppId: process.env.LUIS_APP_ID,
    luisApiKey: process.env.LUIS_API_KEY,
    luisApiHostName: process.env.LUIS_API_HOST_NAME,
    luisVersionId: process.env.LUIS_VERSION_ID,

    appId: process.env.MS_APP_ID !== undefined ? process.env.MS_APP_ID : null,
    appPassword: process.env.MS_APP_PASSWORD !== undefined ? encodeURI(process.env.MS_APP_PASSWORD) : null,

    cosmosdbHostName: process.env.COSMOSDB_HOST_NAME,
    masterKey: process.env.COSMOSDB_KEY,
    database: process.env.COSMOSDB_DB,
    collection: process.env.COSMOSDB_COLLECTION,

    port: process.env.PORT,

    protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http'
};