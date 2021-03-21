const express = require('express'); //1. express
const { get } = require('mongoose'); //2. mongoose
const jwt = require("jsonwebtoken"); //3. jsonwebtoken
const { User } = require("../../models/user");
const config = require("../../config/index"); //5. env파일에 있는 환경변수

const { JWT_SECRET } = config;

const router = express.Router();

// Get All User / GET

router.get("/api/user/", async(req, res) =>{
    try{
        const users = await User.find(); //Schema로 만든 유저정보를 가져와줌

        if(!user){
            return res.status(400).json({msg: "유저가 존재하지 않습니다."});
        }
        res.status(200).json(users);
    } catch(e) {
        console.log(e);
    }
});


// REGISTERS USER / POST

router.post("/api/user/register", (req, res) =>{
    const { name, email, password } = req.body;

    if(!name) return res.status(400).json({ msg: "이름을 작성해주세요."});
    else if(!email) return res.status(400).json({msg: "이메일을 작성해주세요"});
    else if(!password) return res.status(400).json({msg: "비밀번호를 작성해주세요"});

   User.findOne({ email }).then((user)=>{
      if(user) return res.status(400).json({ msg: "이미 존재하는 유저입니다."});
      
      const newUser = new User({
          name,
          email,
          password
      });

      bcrypt.genSalt(10, (err, salt)=>{
          bcrypt.hash(newUser.password, salt, (err, hash)=>{
              if(err) return res.status(400).json({err});

              newUser.password = hash;
              newUser.save().then((user)=>{
                //sign(유저 정보, secretkey, option, function)
                //token = 유저 정보 + secretkey
                jwt.sign(
                    { id : user.id }, //유저정보
                    JWT_SECRET, //secretkey
                    { expiresIn: 3600 }, //option
                    ( err, token ) =>{ //function
                        if(err) return res.status(400).json({err});

                        res.json({
                            token,
                            user : {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                        })
                    }
                )
              })
          })
      })
   });
});


// Change User Password / POST
router.post("/changepassword", async (req, res) => {
    const { email, password } = req.body;
  
    if (!email) return res.status(400).json({ msg: "이메일을 작성해주세요." });
    else if (!password)
      return res.status(400).json({ msg: "비밀번호를 입력해주세요." });
  
    User.findOne({ email }).then((user) => {
      if (!user) return res.status(400).json({ msg: "없는 이메일입니다." });
    
      bcrypt.genSalt(10, (err, salt) => { //암호화해주는 모듈
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) return res.status(400).json({ err });
          try {
            await User.findByIdAndUpdate(
              user.id,
              { password: hash },
              { new: true }
            );
            res.json("success");
          } catch (e) {
            console.log(e);
          }
        });
      });
    });
  });

module.exports = router;