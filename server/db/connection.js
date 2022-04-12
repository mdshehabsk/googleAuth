const mongose = require('mongoose');




const connect = async () => {
    try {
        await mongose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


module.exports = connect
