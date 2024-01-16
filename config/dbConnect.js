const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        await mongoose.connect("mongodb+srv://lebin642:binbep25112201@cluster0.b5qkn1e.mongodb.net/FD_Database?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("Database Connection Error:", error.message);
    }
};

module.exports = dbConnect;