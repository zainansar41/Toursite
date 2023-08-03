import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import stripe from './router/stripe.js';
import stripeCheckout from './router/stripeCheckout.js';
import multer from 'multer';
import router from './router/router.js';

import connect from './database/conn.js'

const app = express()
const port = 5000;
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

app.use("/api/stripe", stripe);

app.use(express.json({ limit: '10mb' }))
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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name);
    }
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single("file"), (req, res) => {
    if (req.file) {
        res.status(200).json('File is Uploaded')
    } else {
        res.status(500).json('File is not Uploaded')
    } 
});

app.use('/images', express.static("images"))


app.use('/api', router)
app.use('/api/stripe', stripeCheckout)


