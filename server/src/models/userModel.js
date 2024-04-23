import mongoose from "mongoose";
import Auth from "../utils/auth.js";
import crypto from "crypto"
const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(?=.*[a-zA-Z0-9._%+-]+@(?:gmail\.com|outlook\.com|yahoo\.com|zoho\.com)$).+$/
      );
  };

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter name"],
      trim: true,
    },
    email: {
        type: String,
        required :[true, "Please enter email"],    
        unique: true,  
        trim: true, 
        validate:{
            validator:validateEmail,
            message: props => `${props.value} is not a valid email!`
        }, 
        lowercase: true
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      select: false,
      trim: true
    },       
    role: {
      type: String,
      default: "user",
    },
    avatar: {
      type: String,
      default: ""
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    verified: { type: Boolean, default: false },
    verificationToken: String,
    verificationTokenExpire: Date,
  },
  
  { 
    timestamps: true,
    collection : "users",
    versionKey: false
  }, 
);

//Save the password convert to hast string
UserSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await Auth.createHash(this.password)
})

//Auth new token genreate
UserSchema.methods.getJwtToken = async function(){
  return await Auth.createToken({id: this.id})
}

//Auth password compare
UserSchema.methods.isValidPassword = async function(enteredPassword){    
  return await Auth.compareHash(enteredPassword, this.password)    
}

// userSchema.methods.getResetToken = async function(){
//   //Generet Token
//  const token = crypto.randomBytes(20).toString('hex')

//  //Generate Hash and set to resetPasswordToken
// this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex')

// //Set token expire time
// this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000; //Add 30 minutes

// return token
// }

UserSchema.methods.getVerifyToken = async function(){
  //Generet Verify Token
  const token = crypto.randomBytes(25).toString("hex")
  //Generet Hash and set ot verify Token
  this.verificationToken = crypto.createHash("sha256").update(token).digest("hex")
  //Set verify token expire time
  this.verificationTokenExpire = Date.now() + (2 * 60 * 60 * 1000); // Add 2 hours
}

const UserModel = mongoose.model("users", UserSchema);
export default UserModel;