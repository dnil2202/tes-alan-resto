const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const { dbSeq, checkSeq } = require('./config/sequilize')
const PORT = 4000
const app = express()

app.use(cors())
app.use(express.json())
checkSeq()

app.use(express.static('public'))


app.get('/', (req,res)=>{
    res.status(200).send('<h1>API RUN<h1/>')
})

const { menuRouter } = require('./routers')
app.use('/menu',menuRouter)

dbSeq.sync().then(()=>{
    app.listen(PORT,()=>console.log(`Running API on ${PORT}`))
})