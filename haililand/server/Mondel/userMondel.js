const DbBase = require('./DbBase');
class UserModul extends DbBase {
    constructor() {
            super();
        }
        //注册

    userIshav(tel, callback) {
        let sql = "select * from user where tel = ?";
        this.mydb.query(sql, [tel], (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(result)
            }
        })
    }
    userReg(tel, passwd, date, callback) {
        let newsql = `insert into user (tel,passwd,regtime) VALUES(?,?,?)`
        this.mydb.query(newsql, [tel, passwd, date], (err, result) => {

            if (err) {
                callback(err)
            } else {
                callback(result)
            }
        })

    }
    userLogin(tel, callback) {
            let sql = "select * from user where tel=?";
            this.mydb.query(sql, [tel], (err, result) => {
                callback(result);
            })
        }
        //登录成功后，修改登录状态，和登录时间
    userUS(tel, date, callback) {
            console.log(tel)
            let sql = "update user set status=1,logintime=? where tel=?";
            this.mydb.query(sql, [date, tel], (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    callback(result)
                }
            })
        }
        //退出登录
    userUnLogin(tel, callback) {
            console.log(tel)
            let sql = "update user set status=0 where tel=?";
            this.mydb.query(sql, [tel], (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    callback(result)
                }
            })
        }
        //用户信息列表
    userList(callback) {
            let sql = "select uid,tel,passwd,regtime,admin from user where 1";
            this.mydb.query(sql, (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    callback(result)
                }
            })
        }
        //用户删除
    userDel(uid, callback) {
            let sql = "delete from user where uid =?";
            this.mydb.query(sql, [uid], (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    callback(result)
                }
            })
        }
        //获取修改用户信息
    userEadInfo(uid, callback) {
        let sql = "select tel,passwd,admin from user where uid=?"
        this.mydb.query(sql, [uid], (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(result)
            }
        })
    }
    userEadduser(uid, tel, passwd, admin, callback) {
        let sql = "update user set tel=?,passwd=?,admin=? where uid=?"
        this.mydb.query(sql, [tel, passwd, admin, uid], (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(result)
            }
        })
    }
}
module.exports = UserModul