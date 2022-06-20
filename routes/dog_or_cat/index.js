const express = require("express")
const dogcatCtrl = require("../../controllers/dog_or_cat/index");

const dogcat = express.Router()

dogcat.get('/', (req, res) => {
    res.send("Hello World!")
})

dogcat.post("/dogorcat", dogcatCtrl.postDogCat)

module.exports = {
    dogcat,
}