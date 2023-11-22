const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator")
const User = require("../models/User")
const crypto = require("crypto")
const expressJWT = require("express-jwt")
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'guduriabhinay8@gmail.com', 
      pass: 'zeco vvjp rcst qtnx ' 
  }
});
exports.signup = (req, res) => {
  const errors = validationResult(req)
  console.log(req.body)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errorMsg: errors.array()[0].msg,
    })
  }
  const { name, dob, email, password, collegeId, rollno } = req.body
  User.findOne({ email }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        errorMsg: "An error occured",
      })
    }
    if (user) {
      return res.status(200).json({
        errorMsg: "User already exits",
      })
    }
    if (!user) {
      var eduRegex = /\.edu$/;
    if(eduRegex.test(email)){
      const verify_code = crypto.randomBytes(3).toString("hex");
      const newUser = new User({
        name,
        email,
        password,
        dob,
        rollno,
        collegeId,
        verify_code
      })
      newUser.save((err, user) => {
        if (err) {
          return res.status(400).json({
            err,
            errorMsg: "An error occured while processing the request",
          })
        }else{
          const link = "http://localhost:3000/verify/"+email+"/"+verify_code;
          const mailOptions = {
            from: 'stuconnect@gmail.com', // Sender's email address
            to: 'guduriabhinay@gmail.com', // Recipient's email address
            subject: 'Verify your stuconnect Account', // Email subject
            html: `<html>
            <body>
                <h2>Hello, `+name+` </h2>
                <p>click the  <a href="`+link+`">link</a> to verify your Stuconnect Account</p>
            </body>
            </html>`
        };
        transporter.sendMail(mailOptions, (error, info) => {
          return res.status(200).json({
            success: "true",
            data: user.name,
          })
      });
        }
        
      })
    }else{
      return res.status(400).json({
        err,
        errorMsg: "we only accept .edu mails",
      })
    }
    }
  })
}

exports.signin = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errorMsg: errors.array()[0].msg,
    })
  }
  const { email, password } = req.body
  User.findOne({ email , is_verified:1 }, (err, user) => {
    if (err) {
      return res.status(400).json({
        errorMsg: "An error occured!",
      })
    }
    if (!user) {
      return res.status(400).json({
        errorMsg: "Wrong credentials!",
      })
    }
    if (!user.authenticate(password)) {
      return res.status(400).json({
        errorMsg: "Wrong credentials!",
      })
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET)
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: true,
      expire: new Date() + 9999,
    })

    const { _id, name, email, role, collegeId, rollno } = user

    res.status(200).json({
      token,
      user: {
        _id,
        name,
        email,
        role,
        rollno,
        collegeId,
      },
    })
  })
}

exports.signout = (req, res) => {
  res.clearCookie("token")
  return res.json({
    msg: "Signed out successfully",
  })
}

exports.verify = (req,res)=>{
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errorMsg: errors.array()[0].msg,
    })
  }
  const {email, code} = req.body;
  if(code != ""){
  User.findOne({ email , is_verified:0 ,verify_code:code}, (err, user) => {
    if (err) {
      return res.status(400).json({
        errorMsg: "An error occured!",
      })
    }
    if (!user) {
      return res.status(400).json({
        errorMsg: "Invalid Link",
      })
    }else{
      console.log("found")
      User.findByIdAndUpdate(
        user._id,
        { $set: { is_verified: 1 , verify_code:"" } },
        { new: true }, // To return the updated user
        (err, updatedUser) => {
          if (err) {
            return res.status(400).json({
              errorMsg: "Something went wrong",
            })
          }
          if(updatedUser){
            return res.status(200).json({
              status:1
            })
          }
        }
      );
    }

  });
}else{
  return res.status(400).json({
        errorMsg: "Invalid Link",
      })
}
}

// for protected routes
exports.isSignedIn = expressJWT({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
})

// custom middleware
exports.isAuthenticated = (req, res, next) => {
  console.log(req.profile)
  console.log(req.auth)
  let check = req.profile && req.auth && req.profile._id == req.auth.id
  if (!check) {
    return res.status(403).json({
      errorMsg: "Access denied",
    })
  }
  next()
}

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 1 || req.profile.role === 0) {
    return res.status(403).json({
      errorMsg: "Access denied ! not admin",
    })
  }
  next()
}
