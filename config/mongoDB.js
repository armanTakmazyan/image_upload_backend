const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
mongoose.set('debug', true);
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('MongoDB Connected...');
    }catch(err){
        console.error('Failed attempt to connect to mongoDB: ', err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;