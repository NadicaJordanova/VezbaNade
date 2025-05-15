const mongoose = require("mongoose");

const programaSchema = new mongoose.Schema({
    ime: {
        type: String,
        required: [true, "Imeto e zadolzitelno"]
    },
    oblast: {
        type: String,
        required: [true, "Oblasta e zadolzitelna"]
    }
})

const Programa = mongoose.model('Programa', programaSchema)

module.exports = Programa