const tf = require('@tensorflow/tfjs-node')
const fs = require("fs")
const path = require('path')
const {dogOrCatKeys, dogBreedKeys, catBreedKeys} = require("./keys")

const IMAGE_WIDTH = 224
const IMAGE_HEIGHT = 224
const IMAGE_CHANNELS = 3

const preprocess = img => {
    //convert the image data to a tensor 
    const tensor = tf.node.decodeImage(img, IMAGE_CHANNELS)
    //resize to 50 X 50
    const resized = tf.image.resizeBilinear(tensor, [IMAGE_WIDTH, IMAGE_HEIGHT]).toFloat()
    // Normalize the image 
    const offset = tf.scalar(255.0)
    const normalized = tf.scalar(1.0).sub(resized.div(offset))
    //We add a dimension to get a batch shape 
    const batched = normalized.expandDims(0)
    return batched
}

// Metodo POST que recibe una imagen en base64, un nombre de archivo sin formato y un formato
// Este metodo analiza la imagen y entrega el porcentaje de similitud con un perro y un gato
async function postDogCat(req, res){
    console.log("\nPeticion dogcat")
    if (!req.body.image) {
        return res.status(400).json({
            error: 'required "image" field is missing'
        })
    } else if(!req.body.format){
        return res.status(400).json({
            error: 'required "format" field is missing'
        })
    }

    // recibimos argumentos
    const dataTrim = req.body.image.trim()
    const image64 = JSON.parse(dataTrim).img
    const formato = req.body.format
    const name = (req.body.name) ? req.body.name : "temp"

    // creamos imagen a partir de base64
    console.log("Creando imagen temporal...")
    const nombreFile = name + "." + formato
    let binaryData = Buffer.from(image64, 'base64')
    const rutaWrite = path.join(__dirname, "../../models/images/", nombreFile)
    fs.writeFile(rutaWrite, binaryData, (err) => {
        if(err){
            return res.status(400).json({
                error: 'problems with the image'
            })
        }
    })

    // cargando modelo
    const modelLink = "file://./models/modelo_perro_gato/model.json"
    const model = await tf.loadLayersModel(modelLink)

    // definiendo rutas y leyendo imagen
    const ruta = path.join(__dirname, "../../models/images", nombreFile)
    const imageLeer = fs.readFileSync(ruta)
    console.log("Procesando imagen...")
    const imagenProcesada = preprocess(imageLeer)

    // haciendo prediccion y borrando imagen
    const prediction = model.predict(imagenProcesada)
    const valores = await prediction.dataSync()
    fs.unlinkSync(ruta)

    // entregando resultados
    let data = {}
    for(let i=0; i<dogOrCatKeys.length; i++){
        data[dogOrCatKeys[i]] = valores[i]
    }
    console.log("Respuesta entregada")
    return res.json(data)
}

// Metodo POST que recibe una imagen en base64, un nombre de archivo sin formato y un formato
// Este metodo analiza la imagen y entrega el porcentaje de similitud con 120 razas de perros
async function postDogBreed(req, res){
    console.log("\nPeticion dogbreed")
    if (!req.body.image) {
        return res.status(400).json({
            error: 'required "image" field is missing'
        })
    } else if(!req.body.format){
        return res.status(400).json({
            error: 'required "format" field is missing'
        })
    }

    // recibimos argumentos
    const dataTrim = req.body.image.trim()
    const image64 = JSON.parse(dataTrim).img
    const formato = req.body.format
    const name = (req.body.name) ? req.body.name : "temp"

    // creamos imagen a partir de base64
    console.log("Creando imagen temporal...")
    const nombreFile = name + "." + formato
    let binaryData = Buffer.from(image64, 'base64')
    const rutaWrite = path.join(__dirname, "../../models/images/", nombreFile)
    fs.writeFile(rutaWrite, binaryData, (err) => {
        if(err){
            return res.status(400).json({
                error: 'problems with the image'
            })
        }
    })

    // cargando modelo
    const modelLink = "file://./models/modelo_raza_perro/model.json"
    const model = await tf.loadLayersModel(modelLink)

    // definiendo rutas y leyendo imagen
    const ruta = path.join(__dirname, "../../models/images", nombreFile)
    const imageLeer = fs.readFileSync(ruta)
    console.log("Procesando imagen...")
    const imagenProcesada = preprocess(imageLeer)

    // haciendo prediccion y borrando imagen
    const prediction = model.predict(imagenProcesada)
    const valores = await prediction.dataSync()
    fs.unlinkSync(ruta)

    // guardando los mejores 5 porcentajes
    let valoresFinales = {}
    for (let i = 0; i < valores.length; i++) {
        valoresFinales[dogBreedKeys[i]] = valores[i]
    }
    let items = Object.keys(valoresFinales).map((key) => {
        return [key, valoresFinales[key]]
    })
    items.sort((a,b) => {
        return b[1]-a[1]
    })
    let itemsFinales = items.slice(0,5)

    // entregando resultados
    let data = {}
    for(let i=0; i<itemsFinales.length; i++){
        data[itemsFinales[i][0]] = itemsFinales[i][1]
    }
    console.log("Respuesta entregada")
    return res.json(data)
}

// Metodo POST que recibe una imagen en base64, un nombre de archivo sin formato y un formato
// Este metodo analiza la imagen y entrega el porcentaje de similitud con xxx razas de gatos
async function postCatBreed(req, res){
    console.log("\nPeticion catbreed")
    if (!req.body.image) {
        return res.status(400).json({
            error: 'required "image" field is missing'
        })
    } else if(!req.body.format){
        return res.status(400).json({
            error: 'required "format" field is missing'
        })
    }

    // recibimos argumentos
    const dataTrim = req.body.image.trim()
    const image64 = JSON.parse(dataTrim).img
    const formato = req.body.format
    const name = (req.body.name) ? req.body.name : "temp"

    // creamos imagen a partir de base64
    console.log("Creando imagen temporal...")
    const nombreFile = name + "." + formato
    let binaryData = Buffer.from(image64, 'base64')
    const rutaWrite = path.join(__dirname, "../../models/images/", nombreFile)
    fs.writeFile(rutaWrite, binaryData, (err) => {
        if(err){
            return res.status(400).json({
                error: 'problems with the image'
            })
        }
    })

    // cargando modelo
    const modelLink = "file://./models/modelo_raza_gato/model.json"
    const model = await tf.loadLayersModel(modelLink)

    // definiendo rutas y leyendo imagen
    const ruta = path.join(__dirname, "../../models/images", nombreFile)
    const imageLeer = fs.readFileSync(ruta)
    console.log("Procesando imagen...")
    const imagenProcesada = preprocess(imageLeer)

    // haciendo prediccion y borrando imagen
    const prediction = model.predict(imagenProcesada)
    const valores = await prediction.dataSync()
    fs.unlinkSync(ruta)

    // guardando los mejores 5 porcentajes
    let valoresFinales = {}
    for (let i = 0; i < valores.length; i++) {
        valoresFinales[catBreedKeys[i]] = valores[i]
    }
    let items = Object.keys(valoresFinales).map((key) => {
        return [key, valoresFinales[key]]
    })
    items.sort((a,b) => {
        return b[1]-a[1]
    })
    let itemsFinales = items.slice(0,5)

    // entregando resultados
    let data = {}
    for(let i=0; i<itemsFinales.length; i++){
        data[itemsFinales[i][0]] = itemsFinales[i][1]
    }
    console.log("Respuesta entregada")
    return res.json(data)
}

// Metodo POST que recibe una imagen en base64, un nombre de archivo sin formato y un formato
// Este metodo analiza la imagen y entrega un estado, un tipo de animal y el porcentaje de los 5 mejores resultados de similitud con el total de razas
async function postAllDogCat(req, res){
    res.send("HOLI")
}

module.exports = {
    postDogCat,
    postDogBreed,
    postCatBreed,
    postAllDogCat
}