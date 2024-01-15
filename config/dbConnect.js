const { default: mongoose } = require("mongoose")

const dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connect Successfully");
    } catch (error) {
        console.log("Database Error");
    }
};
module.exports = dbConnect;