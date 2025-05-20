const Programa = require('../model/programaSchema')


exports.createPrograma = async (req, res) => {
    try{
        req.body.creator = req.auth._id;
       const novaPorgrama = await Programa.create(req.body)
       console.log(novaPorgrama.creator)
       res.status(200).json({
        status: "Success",
        programa: novaPorgrama
       })
    }
    catch(err){
        res.status(500).json({
            status: "Fail",
            error: err.message
           })
    }
}

exports.updatePrograma = async (req, res) => {
    try{
       const izmenetaPrograma = await Programa.findByIdAndUpdate(req.params.id ,req.body)

       res.status(200).json({
        status: "Success",
        programa: izmenetaPrograma
       })
    }
    catch(err){
        res.status(500).json({
            status: "Fail",
            error: err.message
           })
    }
}

exports.deletePrograma = async (req, res) => {
    try{
       const izbrisanaPrograma = await Programa.findByIdAndDelete(req.params.id)

       res.status(200).json({
        status: "Success",
        programa: izbrisanaPrograma
       })
    }
    catch(err){
        res.status(500).json({
            status: "Fail",
            error: err.message
           })
    }
}


exports.programi = async (req, res) => {
    try{
       const programi = await Programa.find().populate("creator")
       
       res.status(200).json({
        status: "Success",
       programi: programi
       })
    }
    catch(err){
        res.status(500).json({
            status: "Fail",
            error: err.message
           })
    }
}
