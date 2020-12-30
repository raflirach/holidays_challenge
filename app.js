const express = require('express')
const router = require('./routes')
const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))

app.use('/', router)


app.listen(PORT, ()=> {
    console.log(`This app listen to http://localhost:${PORT}`);
})