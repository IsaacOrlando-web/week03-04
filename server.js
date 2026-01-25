import express from 'express';
// load environment variables
import './loadenvironment.mjs';
import db from './db/database.mjs';
import router from './routes/index.mjs';



const app = express();
const port = 3000;

//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, z-key'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
})

//routes
app.use('/', router);



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});