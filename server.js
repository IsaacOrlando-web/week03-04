import express from 'express';
// load environment variables
import './loadenvironment.mjs';
import db from './db/database.mjs';
import router from './routes/index.mjs';
import authRouter from './routes/auth.mjs';
import logger from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
//app express
const app = express();
const port = 3000;

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.ATLAS_URI, // Usando tu URI de Atlas
    collectionName: 'sessions',
    ttl: 14 * 24 * 60 * 60, // 14 días
    autoRemove: 'native',
    crypto: {
      secret: 's3cur3s3ss10n' // Opcional: encriptar sesiones
    }
  }),
  cookie: {
    secure: false, // Cambia a true si usas HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 día
  }
}));
app.use(passport.authenticate('session'));

//middleware
app.use(logger('dev'));
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
app.use('/', authRouter);



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});