import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';

import router from './router/router.js';

import connect from './database/conn.js'

const app = express()
const port = 8000;


app.use(express.json({limit:'10mb'}))
app.use(cors())
// app.use(morgan('tiny'))
app.disable('x-powered-by')

app.use(bodyParser.json({ limit: '10mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false, parameterLimit: 100000 }));



app.use(bodyParser.json({ limit: '10mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false, parameterLimit: 100000 }));

app.get('/', (req, res) => {
    res.send("Home Get request")
})

app.use('/api',router)


connect().then(() => {
    try {

        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`)
        })
    }
    catch (err) {
        console.log("connot connect")
    }
}).catch(error => {
    console.log("invalid database connection")
})
