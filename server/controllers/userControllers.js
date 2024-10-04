const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { User } = require("../schema/user.schema");
const dotenv = require("dotenv");
const {
    userSchema,
    emailSchema,
    loginSchema,
} = require("../utils/validationSchema");

dotenv.config();

const registerUser = async (req, res) => {
    const { name, email, password, number } = req.body;
    const result = userSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json(result.error);
    }
    const ifUserExists = await User.findOne({ email }); // if user exists
    if (ifUserExists) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, number });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
};

const getUser = async (req, res) => {
    const { email } = req.params;
    emailSchema.parse({ email });
    console.log("passed thorugh");
    const user = await User.findOne({ email }).select("-name");
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    loginSchema.parse(req.body);
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Wrong email or password" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return res.status(400).json({ message: "Wrong email or password" });
    }
    const payload = { id: user._id };
    const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET);
    res.status(200).json({ token, user: payload.id });
};

module.exports = {
    registerUser,
    getUser,
    loginUser,
};
