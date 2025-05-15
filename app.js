const express = require('express')
const programaHandler = require('./handler/programiHandler')
const app = express()
const database = require('./pkg/database')
const jwt = require("express-jwt");
database.connectToDataBase()
const auth = require('./handler/authentication')
const vrabotenHandler = require('./handler/vraboteniHandler')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(express.static("public"));
app.use(cookieParser());

app.post('/signup', auth.signUp)
app.post('/login', auth.logIn )

app.post('/createPrograma' , auth.protect, programaHandler.createPrograma )
app.delete('/deletePrograma/:id',auth.protect, programaHandler.deletePrograma)
app.patch('/updatePrograma/:id', auth.protect,programaHandler.updatePrograma)
app.get("/programi", programaHandler.programi)


app.delete('/deleteVraboten/:id',auth.protect, vrabotenHandler.deleteVraboten)
app.patch('/updatePrograma/:id', auth.protect, vrabotenHandler.updateVraboten)
app.get("/vraboteni", vrabotenHandler.vraboteni)



app.listen(process.env.PORT, (err) => {
    if (err) return console.log(err.message);
    return console.log(`Successfully started on port ${process.env.PORT}`);
})