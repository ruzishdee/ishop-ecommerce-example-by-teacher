import express from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Users from '../models/users'
import UserRole from '../models/userRole'

const authApi = express.Router()





authApi.post('/register', async (request, response) => {

    const data = request.body
    console.log(data)

    if (data) {
        const oldUser = await Users.findOne({ email: data.email });
        if (oldUser) {
            return response.status(400).json({
                success: false,
                message: "Хэрэглэгч бүртгэлтэй байна"
            });
        }

        let hashedPassword = await bcrypt.hash(data.password, 10)
        data.password = hashedPassword;
        try {
            const user = await Users.create(data)
            const result = await user.populate('userrole')

            response.status(201).json({
                message: "Хэрэглэгч амжилттай үүслээ",
                data: result,
            });
        } catch (error) {
            response.status(501).json({
                success: false,
                error: error,
            })
        }
    }
    else {
        return response.status(400).json({ error: 'Input field is empty' })
    }
})

authApi.post('/login', async (request, response) => {

    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).json({
                message: "утгуудыг бүрэн оруулна уу"
            })
        }
        const user = await Users.findOne({ email: email })
        if (!user) {
            return response.status(401).json({
                message: "Нэр болон нууц үгээ шалгана уу !!!"
            })
        }
        const isMatch = await bcrypt.compare(password, user?.password)

        if (isMatch && user) {
            const jwtBody = {
                user_id: user._id,
                email: email
            }
            const token = jwt.sign(jwtBody, "taajAzaaUzdee", { expiresIn: "24h" });

            return response.status(200).json({
                success: true,
                token: token,
                status: " Амжилттай нэвтэрч чадлаа броодэр"
            });
        }

        if (!isMatch || !user) {
            return response.status(402).json({
                success: false,
                status: "Нэр болон нууц үгээ шалгана уу !!!"
            })
        }
    } catch (error) {
        response.status(400).json({
            message: "Failed Broyaaa"
        })
        console.error(error);
    }
})

authApi.post('/role/create', async (req, res) => {
    const { name } = req.body

    const result = await UserRole.create({ name });
    res.status(200).json({
        data: result
    })
})

authApi.get('/role/list', async (req, res) => {
    const result = await UserRole.find({})
    res.status(200).json({
        data: result
    })
})

module.exports = authApi;