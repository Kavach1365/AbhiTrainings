<<<<<<< HEAD
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
=======
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import User from "../models/user.model.js";
import crypto from "crypto";
import emailToken from "../models/token.model.js";
import sendEmail from "../utils/sendEmail.js";

export const signup = async (req, res) => {
  try {
    const { username, fullName, password, email } = req.body;

    const emailRegex = new RegExp(
      "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
    );
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email" });
>>>>>>> f2257920a8c85e48012ecf29861321f8fa113194
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already taken" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password length is too short" });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
<<<<<<< HEAD
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
=======
      fullName: fullName,
      email: email,
      username: username,
      password: hashedPassword,
    });

    if (newUser) {
      await newUser.save();
      const token = await new emailToken({
        userId: newUser._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

      const url = `${process.env.BASE_URL}users/${newUser._id}/verify/${token.token}`;
      await sendEmail(newUser.email, "Verify Email", url);

      // console.log("Email sent Successfully");
      // generateTokenAndSetCookie(newUser._id,res)

      // res.status(201).json({
      //     _id:newUser._id,
      //     fullName:newUser.fullName,
      //     email:newUser.email,
      //     username:newUser.username,
      //     profileImg:newUser.profileImg,
      //     coverImg:newUser.coverImg,
      // })

      return res
        .status(201)
        .json({
          message: "Verification mail has been sent to your email.Please verity.",
        });
    } else {
      res.status(400).json({ error: "Invalid User Data" });
>>>>>>> f2257920a8c85e48012ecf29861321f8fa113194
    }


   }catch(error){
        console.log("Error in Signup controller",error);
        res.status(500).json({error:"Internal Server Error:"})
   }
};

<<<<<<< HEAD


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
=======
export const emailresend = async (req,res)=>{

    try{

        const {username,email} = req.body;     

        const user = await User.findOne({username,email});
        const token=await emailToken.findOne({userId:user._id});

        if(!token)
        return res.status(200).json({message:"Email Verification done Successfully"});
        
        const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
        await sendEmail(user.email,"Verify Email",url);

>>>>>>> f2257920a8c85e48012ecf29861321f8fa113194

    }catch(error){
        console.log("Error in Email Resend controller",error);
        res.status(500).json({error:"Internal Server Error:"})
    }
}

export const emailVerification = async (req,res)=>{

    try{
        const user = await User.findOne({_id:req.params.id});
        if(!user)
        return res.status(400).json({error:"Invalid link"});
        
        const token = await emailToken.findOne({
            userId:user._id,
            token: req.params.token
        });
        if(!token) 
        return res.status(400).json({error:"Invalid link"});
        
        await User.updateOne({_id: user._id}, { $set: { verified: true } });
        await emailToken.deleteOne({ userId:user._id,token:req.params.token});

    res.status(200).json({ message: "Email verified Successfully" });
  } catch (error) {
    console.log("Error in EmailVerifcation controller", error);
    res.status(500).json({ error: "Internal Server Error:" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Username or Password wrong" });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({ error: "Username or Password wrong" });
    }

    if (!user.verified) {
      let token = await emailToken.findOne({ userId: user._id });
      if (!token) {
        token = await new emailToken({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify your Email", url);
      }

      return res
        .status(400)
        .json({
          error: "verificaion mail has been sent to your account.Please verify",
        });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      username: user.username,
      profileImg: user.profileImg,
    });
  } catch (error) {
    console.log("Error in Login controller", error);
    res.status(500).json({ error: "Internal Server Error:" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in Logout controller", error);
    res.status(500).json({ error: "Internal Server Error:" });
  }
};

export const authCheck = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in authCheck Controller", error.message);
    res.status(500).json({ error: "Internal Server Error:" });
  }
};
