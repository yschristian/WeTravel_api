import { verify } from "../helper/jwt";

const verifyToken = async (req,res,next)=>{
    try {
        let token = req.header("Authorization")
        if(!token){
            return res.status(403).json("access denied")
        }
        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length)
        }
        const verified = verify(token)
        req.user = verified
        next()
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}
export default verifyToken