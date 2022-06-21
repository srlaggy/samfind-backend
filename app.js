const express = require('express')
const app = express()
const cors = require('cors')
const {reconocimiento} = require("./routes/reconocimiento/index")

app.use(cors())
app.use(express.json({limit: '10mb'}));
// app.use(express.urlencoded({limit: '50mb'}));

app.use("/api", reconocimiento)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    try {
        console.log("Connected to database");
    } catch (err) {
        console.error("Error. Cant connect to database:", err);
    }
    console.log(`Server running on port ${PORT}`)
})