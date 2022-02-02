const express = require("express")
const app = express()

// *** call auth ***
// panggil fungsi auth -> validasi token
const {auth} = require("./login")

// fungsi auth dijadikan middleware
app.use(auth)
// ---------------------------------


// call model for paket
const paket = require("../models/index").paket

// middleware for allow the request from body (agar bisa membaca data yg dibody)
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// end-point akses data paket dg method GET
app.get("/", async(req, res) => {
    paket.findAll()
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// end-point akses data paket berdasarkan 'id_paket' tertentu dg method GET
app.get("/:id_paket", async(req, res) => {
    paket.findOne({where: {id_paket: req.params.id_paket}})
    .then(paket => {
        res.json(paket)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// end-point menambah new paket dg method POST
app.post("/",async(req,res)=>{
    //tampung data request yang akan dimasukkan
    let newPaket = {
        jenis:req.body.jenis,
        harga:req.body.harga
    }

//execute insert new paket
paket.create(newPaket)
.then(result=>{
    res.json({
        message:"Data Success",
        data:result
    })
})
.catch(error=>{
    res.json({
        message:error.message
    })
})

})

// end-point mengubah data paket dg method PUT
app.put("/", async(req, res) => {
    // key yg menunjukkan data yg akan diubah
    let param = {
        id_paket: req.body.id_paket
    }

    // tampung data request yg akan diubah
    let data = {
        jenis: req.body.jenis,
        harga: req.body.harga
    }

    // execute update data
    paket.update(data, {where: param})
    .then(result => {
        res.json({
            message: "Data Updated",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// end-point menghapus data paket berdasarkan 'id_paket' dg method DELETE
app.delete("/:id_paket", async(req, res) => {
    // tampung data yg akan dihapus
    let param = {
        id_paket: req.params.id_paket
    }

    // execute delete data
    paket.destroy({where: param})
    .then(result => {
        res.json({
            message: "Data Deleted"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

module.exports = app
