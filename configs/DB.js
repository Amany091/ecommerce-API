const mongoose = require("mongoose");
exports.DBConnection = ()=>{
    mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Database connected successfully");

        
    })
    .catch((err) => console.error(`Database Error : ${err}`))
}
