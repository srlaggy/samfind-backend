const tf = require('@tensorflow/tfjs-node');
const fs = require("fs");
const path = require('path')

const imageWidth = 244;
const imageHeight = 244;
const imageChannels = 3;
const keys = ["Gato", "Perro"]

const preprocess = img => {
    //convert the image data to a tensor 
    const tensor = tf.node.decodeImage(img, imageChannels);
    //resize to 50 X 50
    const resized = tf.image.resizeBilinear(tensor, [imageWidth, imageHeight]).toFloat()
    // Normalize the image 
    const offset = tf.scalar(255.0);
    const normalized = tf.scalar(1.0).sub(resized.div(offset));
    //We add a dimension to get a batch shape 
    const batched = normalized.expandDims(0)
    return batched
}

async function postDogCat(req, res){
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
    const nombreFile = name + "." + formato
    let binaryData = Buffer.from(image64, 'base64');
    const rutaWrite = path.join(__dirname, "../../models/images/", nombreFile)
    fs.writeFile(rutaWrite, binaryData, (err) => {
        if(err){
            return res.status(400).json({
                error: 'problems with the image'
            })
        }
    });

    // cargando modelo
    const modelLink = "file://./models/modelo_perro_gato/model.json"
    const model = await tf.loadLayersModel(modelLink)

    // definiendo rutas y leyendo imagen
    const ruta = path.join(__dirname, "../../models/images", nombreFile)
    const imageLeer = fs.readFileSync(ruta);
    const imagenProcesada = preprocess(imageLeer)

    // haciendo prediccion y borrando imagen
    const prediction = model.predict(imagenProcesada)
    const valores = await prediction.dataSync()
    fs.unlinkSync(ruta);


    // entregando resultados
    let data = {}
    for(let i=0; i<keys.length; i++){
        data[keys[i]] = valores[i]
    }
    return res.json(data)
}

module.exports = {
    postDogCat,
}