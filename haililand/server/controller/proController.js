const express = require("express")
const proMondel = require(__dirname + '/../Mondel/proMondel');
const router = express.Router();

router.get("/allProd", (req, res) => {
    //  console.log(req.query);
    let ProMondel = new proMondel();
    ProMondel.getAllPro((reslut) => {
        console.log(reslut);
        res.json(reslut);
    })
})

router.post("/allProd/list", (req, res) => {
    console.log("--------------------", req.body);
    let ProMondel = new proMondel();
    ProMondel.getSeriesPro(req.body.id, (reslut) => {
        //  console.log(reslut);
        res.json(reslut);
    })
})

router.get("/wagaShi", (req, res) => {
    //  console.log(req.query);
    let ProMondel = new proMondel();
    ProMondel.getwagaShi(1, (reslut) => {
        //  console.log(reslut);
        res.json(reslut);
    })
})


router.post("/prodInfo", (req, res) => {
    console.log(req.body);
    let ProMondel = new proMondel();
    ProMondel.getProdById(req.body.pid, (reslut) => {
        console.log(reslut);
        res.json(reslut)
            // console.log();
    })
})
router.post("/allProd/dimSer", (req, res) => {
    console.log("--------------------", req.body);
    let ProMondel = new proMondel();
    ProMondel.getdimSer(req.body.serve, (reslut) => {
        //  console.log(reslut);
        res.json(reslut);
    })
})


module.exports = router;