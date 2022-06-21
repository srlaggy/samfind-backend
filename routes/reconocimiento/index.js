const express = require("express")
const reconocimientoCtrl = require("../../controllers/reconocimiento/index");

const reconocimiento = express.Router()

reconocimiento.get('/', (req, res) => {
    res.send("Hello World!")
})

reconocimiento.post("/dogorcat", reconocimientoCtrl.postDogCat)
reconocimiento.post("/dogbreed", reconocimientoCtrl.postDogBreed)
reconocimiento.post("/catbreed", reconocimientoCtrl.postCatBreed)
reconocimiento.post("/alldogcat", reconocimientoCtrl.postAllDogCat)

module.exports = {
    reconocimiento,
}