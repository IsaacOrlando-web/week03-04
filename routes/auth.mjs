import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oidc';
import db from '../db/database.mjs';
const authRouter = express.Router();

// SOLO ESTA PARTE FUE ADAPTADA:
passport.use(new GoogleStrategy({
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: '/oauth2/redirect/google',
  scope: [ 'profile' ]
}, async function verify(issuer, profile, cb) {
  try {
    // Buscar credencial existente en MongoDB
    const federatedCredential = await db.collection('federated_credentials').findOne({
      provider: issuer,
      subject: profile.id
    });

    if (!federatedCredential) {
      // Crear nuevo usuario
      const userResult = await db.collection('users').insertOne({
        name: profile.displayName,
        createdAt: new Date()
      });

      // Crear credencial federada
      await db.collection('federated_credentials').insertOne({
        user_id: userResult.insertedId,
        provider: issuer,
        subject: profile.id
      });

      const user = {
        id: userResult.insertedId.toString(),
        name: profile.displayName
      };
      return cb(null, user);
    } else {
      // Usuario existente
      const user = await db.collection('users').findOne({
        _id: federatedCredential.user_id
      });

      if (!user) {
        return cb(null, false);
      }

      // Convertir ObjectId a string
      const userData = {
        id: user._id.toString(),
        name: user.name
      };
      return cb(null, userData);
    }
  } catch (err) {
    return cb(err);
  }
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

authRouter.get('/login', 
    passport.authenticate('google', {
  scope: ['email']
})
);

authRouter.get('/oauth2/redirect/google', passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/');
});

authRouter.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

export default authRouter;