const Vraboten = require('../model/vrabotenSchema')


exports.createVraboten = async (req, res) => {
    try{
       const novVraboten = await Vraboten.create(req.body)

       res.status(200).json({
        status: "Success",
        vraboten: novVraboten
       })
    }
    catch(err){
        res.status(500).json({
            status: "Fail",
            error: err.message
           })
    }
}

exports.updateVraboten = async (req, res) => {
    try{
       const izmenetVraboten = await Vraboten.findByIdAndUpdate(req.params.id ,req.body)

       res.status(200).json({
        status: "Success",
        vraboten: izmenetVraboten
       })
    }
    catch(err){
        res.status(500).json({
            status: "Fail",
            error: err.message
           })
    }
}

exports.deleteVraboten = async (req, res) => {
    try{
       const izbrisanVraboten= await Vraboten.findByIdAndDelete(req.params.id)

       res.status(200).json({
        status: "Success",
        vraboten: izbrisanVraboten
       })
    }
    catch(err){
        res.status(500).json({
            status: "Fail",
            error: err.message
           })
    }
}

exports.vraboteni = async (req, res) => {
    try{
       const vraboteni = await Vraboten.find()

       res.status(200).json({
        status: "Success",
        vraboteni: vraboteni
       })
    }
    catch(err){
        res.status(500).json({
            status: "Fail",
            error: err.message
           })
    }
}