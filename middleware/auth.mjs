// auth.js
export const ensureAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
};

export const ensureGuest = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/books');
    } else {
        return next();
    }
};

// Exportar todo como un objeto (opcional)
export default {
    ensureAuth,
    ensureGuest
};