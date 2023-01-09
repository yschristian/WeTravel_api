import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

const sign =  (payload) => jwt.sign( payload, process.env.SECRET_KEY, { expiresIn: '24h' })
const verify =  (payload) => jwt.verify( payload , process.env.SECRET_KEY)

export {sign, verify}
