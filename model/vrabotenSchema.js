const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const vrabotenSchema = new mongoose.Schema({
    ime: {
        type: String,
        required: [true, "Imeto e zadolzitelno"]
    },
    godini: {
        type: String,
        // required: [true, "Godinitie se zadolzitelni"]
    },
    otsek: {
        type: String,
        // required: [true, "Otsekot e zadolzitelen"]
    },
    password:{
        type: String,
        required: [true, "Passwordot e zadolzitelen"],
        select: false
    },
    email: {
        type: String,
        required: [true, "Emailot e zadolzitelen"]
    }
})


vrabotenSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });

 const Vraboten =  mongoose.model('Vraboten', vrabotenSchema)

 module.exports = Vraboten