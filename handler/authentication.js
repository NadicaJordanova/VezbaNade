const Vraboten = require('../model/vrabotenSchema')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const util = require("util");

exports.signUp = async(req, res) => {

    try {
        const novVraboten = await Vraboten.create({
          ime: req.body.ime,
          age: req.body.age,
          password: req.body.password,
          email: req.body.email,
        });
    
        const token = jwt.sign(
          {
            ime: novVraboten.ime,
            id: novVraboten._id,
            email: novVraboten.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRES,
          }
        );
    
        res.cookie("jwt", token, {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          secure: false,
          httpOnly: true,
        });
    
        res.status(201).json({
          status: "Created",
          token,
          data: {
            vraboten: novVraboten,
          },
        });
      } catch (err) {
        res.status(500).json({
          status: "fail",
          err: err.message,
        });
      }
    };
    
    exports.logIn = async (req, res) => {
    
        try{
            const { email, password } = req.body
    
            if (!email || !password) {
                return res.status(401).send("Please enter email or password");
              }
        
             const vraboten = await Vraboten.findOne({ email });
            if (!vraboten) {
              return res.status(401).send("Invalid email or password");
            }
        
            unesenpass = crypto.createHash('sha256').update(password).digest('hex');
        
            const validPassword = bcrypt.compareSync(password, vraboten.password);
        
            if (!validPassword) {
                return res.status(401).send("Invalid email or password");
              }
         
              const token = jwt.sign(
                {
                    id: vraboten._id,
                    ime: vraboten.ime,
                    email: vraboten.email
                },
                process.env.JWT_SECRET,
                {
                  expiresIn: process.env.JWT_EXPIRES,
                }
              )
        
              res.cookie("jwt", token, {
                expires: new Date(
                  Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ),
                secure: false,
                httpOnly: true,
              });
        
        
              res.status(201).json({
                status: "success",
                token: token,
                vraboten,
              });
        }
        catch(err){
            res.status(500).json({
                status: "fail",
                err: err.message,
              });
        }
          
    
    }
    
    
    exports.protect = async (req, res, next) => {
        try{
    let token 
    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
      }
      if (!token) {
        return res.status(500).send("You are not logged in, please log in");
      }
    
      const decoded = await util.promisify(jwt.verify)(
           token,
           process.env.JWT_SECRET
      )
      const vrabotenTrue = await Vraboten.findById(decoded.id);
      if (!vrabotenTrue) {
        return res.status(401).send("Ne postoi");
      }
      req.auth = vrabotenTrue;
    
      next();
        }
        catch(err){
            res.status(500).json({
                status: "fail",
                err: err.message,
              }); 
        }
    }