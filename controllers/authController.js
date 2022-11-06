const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');

require('dotenv').config();

exports.signup = async (req, res) => {
    let user = await UserModel.findOne({ email: req.body.email });

    if (user) {
        return res.status(409).json({
            error: true,
            message: 'Email already taken',
        });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10); 

    user = await UserModel.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
    });

    delete user.password

    res.status(201).json({
        message: 'Signup successful',
        user: user
    });
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: true,
            message: 'Email and password required.',
        });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(401).json({
            error: true,
            message: 'Incorrect email or password A',
        });
    }
        
    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
        return res.status(401).json({
            error: true,
            message: 'Incorrect email or password B',
        });
    }

    const body = { _id: user._id };
    const token = jwt.sign({ user: body }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
        error: false,
        message: 'Login successfully',
        token
    });
}