import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const saltRound = 10;

const createHash = async (data) =>{
    let salt = await bcrypt.genSalt(saltRound);
    let hast = await bcrypt.hash(data, salt)
    return hast
}

//Comparing hashed Data
const compareHash = async(realData, hashedData) => await bcrypt.compare(realData,  hashedData)

const createToken = async(payload)=>{
    let token = await jwt.sign(payload, process.env.JWT_SECRET,{
       expiresIn : process.env.JWT_EXPIRY
    })
    return token
}

const decodeTokens = async(token) => await jwt.verify(token, process.env.JWT_SECRET)


export default {createHash, createToken, compareHash, decodeTokens}