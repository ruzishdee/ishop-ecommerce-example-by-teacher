const mongoose = require('mongoose')

const userRoleSchema = new mongoose.Schema({
    // ! Admin хэрэглэгч бүх эрхтэй хэрэглэгч байна
    // ! customer хэрэглэгч бол Admin panel руу нэвтэрч чадахгүй хэрэглэгч байна
    // ! User хэрэглэгч нь зарим нэг Admin panel дээр устгах өөрчлөх эсвэл эрхгүй хэрэглэгч байна
    name: {
        type: String,
        required: [true, "Enter the Role name"],
        unique: true,
    },
})

const UserRole = mongoose.model("UserRole", userRoleSchema)

module.exports = UserRole;
