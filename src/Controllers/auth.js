import bcrypt from "bcryptjs";
import User from "../Models/User";
import { sign } from "../helper/jwt";

class AuthController {
    static async register(req, res) {
        try {
            const {
                firstName,
                lastName,
                email,
                password,
                picturePath,
                friends,
                location,
                occupation
            } = req.body

            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
            const newUser = new User({
                firstName,
                lastName,
                email,
                password: passwordHash,
                picturePath,
                friends,
                location,
                occupation,
                viewedProfile: Math.floor(Math.random() * 10000),
                impressions: Math.floor(Math.random() * 10000)
            });
            const savedUser = await newUser.save();
            return res.status(201).json(savedUser)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
    static async login(req,res){
        try {
            const {email , password } = req.body;
            const user = await User.findOne({email: email})
            if(!user)  return res.status(400).json({message: "user does not exists"})
            const isMatch = await bcrypt.compare(password , user.password)
            if(!isMatch) return res.status(400).json({message: "invalid credentials."})
            const token = sign({id:user_id, user})
            delete user.password
            return res.status(200).json({token, user})
        } catch (error) {
            
        }
    }
}

export default AuthController
