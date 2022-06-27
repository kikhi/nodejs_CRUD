module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB || 'mongodb://0.0.0.0:27017',
    urlParser : {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
}