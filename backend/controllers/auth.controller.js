import bcrypt from "bcryptjs"
import  {generateTokenAndSetCookie}  from "../lib/utils/generateToken.js";
import User from '../models/user.model.js'
import crypto from "crypto"

export const signup = async (req,res)=>{
   try{
    const {username,fullName,password,email} = req.body;
    console.log(req.body);


    const emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
    
    if(!emailRegex.test(email)){
        return res.status(400).json({error:'Invalid email'})
    }
    
    const existingUser = await User.findOne({username});
    if(existingUser){
        return res.status(400).json({error:'Username already taken'})
    }
    const existingEmail = await User.findOne({email});
    if(existingEmail){
        return res.status(400).json({error:'Email already taken'})
    }

    if(password.length < 6){
        return res.status(400).json({error:'Password length is too short'})
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)

    const newUser = new User({
        fullName:fullName,
        email:email,
        username:username,
        password:hashedPassword,
        verificationToken:verificationToken,
    })


    if(newUser){
        await newUser.save()

        const verificationUrl = `http://localhost:3000/verify/${verificationToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification',
            text: `Click the link to verify your email: ${verificationUrl}`,
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send('Error sending email');
            }
            res.status(200).send('Verification email sent');
        });

        generateTokenAndSetCookie(newUser._id,res)

        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            username:newUser.username,
            profileImg:newUser.profileImg,
            coverImg:newUser.coverImg,
            verificationToken:newUser.verificationToken,
        })
    }
    else{
        res.status(400).json({error:"Invalid User Data"})
    }


   }catch(error){
        console.log("Error in Signup controller",error);
        res.status(500).json({error:"Internal Server Error:"})
   }
};



export const login = async (req,res)=>{
    try{
        const {username, password} = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "Username or Password wrong" });
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(400).json({ error: "Username or Password wrong" });
        }
        generateTokenAndSetCookie(user._id,res);

        res.status(201).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            username:user.username,
            profileImg:user.profileImg,
        })
    }catch(error){
        console.log("Error in Login controller",error);
        res.status(500).json({error:"Internal Server Error:"})
    }
};

export const logout = async (req, res) => {
    try {
      res.cookie('jwt', '', { maxAge: 0, httpOnly: true, secure: true, sameSite: 'Strict' });
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      console.log("Error in Logout controller", error);
      res.status(500).json({ error: "Internal Server Error:" });
    }
  };

export const authCheck = async (req,res)=>{
    try {
        const user = req.user;
        return res.status(200).json(user)
    } catch (error) {
        console.log("Error in authCheck Controller",error.message);
        res.status(500).json({error:"Internal Server Error:"})
    }
}