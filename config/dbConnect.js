const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("Database Connection Error:", error.message);
    }
};

module.exports = dbConnect;