const DbBase = require('./DbBase');
class ProModul extends DbBase {
    constructor() {
            super();
            this.table = 'product';
        }
        //注册
    getAllPro(callback) {
        let sql = `select pid,pname,pexplain,pimg,price from ${this.table} where 1; `;
        this.mydb.query(sql, (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(result)
            }
        })
    }

    getSeriesPro(id, callback) {
        // 1:蛋糕  2：零食  3：蛋糕的0  4：蛋糕的1  5： 蛋糕的2
        let sql;
        id = Number(id);
        switch (id) {
            case 0:
                sql = `select pid,pname,pexplain,pimg,price from ${this.table} where pseries = 0; `;
                break;
            case 1:
                sql = `select pid,pname,pexplain,pimg,price from ${this.table} where pseries = 1; `;
                break;
            case 2:
                sql = `select pid,pname,pexplain,pimg,price from ${this.table} where pseries = 2; `;
                break;
            case 3:
                sql = `select pid,pname,pexplain,pimg,price from ${this.table} where pcategory = 1; `;
                break;
            default:
                break;
        }
        this.mydb.query(sql, (err, result) => {
            if (err) {
                callback(err)
            } else {
                // console.log(result);
                callback(result)
            }
        })
    }

    getwagaShi(pcategory, callback) {
        let sql = `select * from ${this.table} where pcategory = ${pcategory} `;
        this.mydb.query(sql, (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(result)
            }
        })
    }

    getProdById(pid, callback) {
        let sql = `select * from ${this.table} where pid = ${pid}; `;
        let sql1 = `select * from price where pid = ${pid}`;
        this.mydb.query(sql + sql1, (err, result) => {
            if (err) {
                callback(err)
            } else {
                // console.log(result);
                callback(result)
            }
        })
    }
    getdimSer(ser, callback) {
        console.log("come model", ser)
        let sql = `select pid,pname,pexplain,pimg,price from ${this.table} where pname like '%${ser}%' ; `;
        console.log(sql);
        this.mydb.query(sql, (err, result) => {
            if (err) {
                callback(err)
            } else {
                // console.log(result);
                callback(result)
            }
        })
    }
}
module.exports = ProModul