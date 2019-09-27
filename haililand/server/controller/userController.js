const express = require("express")
const userModel = require(__dirname + '/../Mondel/userMondel');
const router = express.Router();
//注册
router.post("/reg", (req, res) => {
        let tel = req.body.name;
        let passwd = req.body.passw;
        let rdate = new Date();
        let ry = rdate.getFullYear();
        let rmm = (rdate.getMonth() + 1).toString().padStart(2, '0');
        let rd = rdate.getDate().toString().padStart(2, '0');
        let rh = rdate.getHours().toString().padStart(2, '0')
        let rm = rdate.getMinutes().toString().padStart(2, '0');
        let rs = rdate.getSeconds().toString().padStart(2, '0');
        let date = `${ry}-${rmm}-${rd} ${rh}:${rm}:${rs}`
        let UserModel = new userModel();

        // console.log(results);
        UserModel.userIshav(tel, (reslut) => {
            console.log(reslut.length);
            if (reslut.length > 0) {
                res.json({ Msg: '注册失败' });
            } else {
                UserModel.userReg(tel, passwd, date, (results) => {
                    console.log(results)
                    if (results.insertId) {
                        res.json({ Msg: '注册成功' });
                    } else {
                        res.json({ Msg: '注册失败，请重新操作' });
                    }

                })
            }
        })


    })
    //登录
router.post("/login", (req, res) => {
        let tel = req.body.name;
        let passwd = req.body.passw;
        let rdate = new Date();
        let ry = rdate.getFullYear();
        let rmm = (rdate.getMonth() + 1).toString().padStart(2, '0');
        let rd = rdate.getDate().toString().padStart(2, '0');
        let rh = rdate.getHours().toString().padStart(2, '0')
        let rm = rdate.getMinutes().toString().padStart(2, '0');
        let rs = rdate.getSeconds().toString().padStart(2, '0');
        let date = `${ry}-${rmm}-${rd} ${rh}:${rm}:${rs}`
        let UserModel = new userModel();
        UserModel.userLogin(tel, (result) => {
            if (result.length == 0) {
                res.json({ Msg: "用户名不存在！" })
            } else if (result[0].passwd != passwd) {
                res.json({ Msg: "用户名密码错误！" })
            } else {
                res.json({ Msg: "登录成功！", admin: result[0].admin })
                UserModel.userUS(tel, date, (data) => {
                    console.log(data)
                })

            }

        })


    })
    //退出登录
router.post("/unlogin", (req, res) => {
        let tel = req.body.username;
        let UserModel = new userModel();
        UserModel.userUnLogin(tel, (data) => {
            console.log(data)
        })


    })
    //获取用户信息列表
router.get("/userlist", (req, res) => {
        let UserModel = new userModel();
        UserModel.userList((data) => {
            res.json(data)
        })


    })
    //删除用户
router.post("/userdel", (req, res) => {
        let uid = req.body.uid
        let UserModel = new userModel();
        UserModel.userDel(uid, (data) => {
            res.json(data)
        })
    })
    //获取修改用户信息
router.get("/eadituserinfo", (req, res) => {
        let uid = req.query.uid
        console.log(uid)
        let UserModel = new userModel();
        UserModel.userEadInfo(uid, (data) => {
            res.json(data)
        })
    })
    //修改用户信息
router.post("/edduser", (req, res) => {
    let uid = req.body.uid
    let tel = req.body.tel
    let passwd = req.body.passwd
    let admin = req.body.admin
    console.log(uid)
    let UserModel = new userModel();
    UserModel.userEadduser(uid, tel, passwd, admin, (data) => {
        res.json(data)
    })
})
module.exports = router;