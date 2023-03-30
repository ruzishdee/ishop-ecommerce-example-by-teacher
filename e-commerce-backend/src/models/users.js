const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require: [true, "Enter the first name"]
    },
    lastname: {
        type: String,
        require: [true, "Enter the last name"]
    },
    email: {
        type: String,
        require: [true, "Please provide an Email"],
        unique: [true, "Eemail Exist"]
    },
    password: {
        type: String,
        require: [true, "Please provide a Password"],
        unique: false
    },
    phone: {
        type: Number,
        minimum: 0
    },
    address: {
        type: String,
        required: [true, "Enter the address"]
    },
    userrole: {
        type: mongoose.Schema.Types.ObjectId, ref: "UserRole",
    }

})

// const Users = mongoose.model("Users", userSchema)

// module.exports = Users;

module.exports = mongoose.model.Users || mongoose.model("Users", userSchema);
