const session = require('express-session');

const requireAuth = (req, res, next) => {
    const token = req.session.loggedin;
    if (!token) {
        res.render('Backend/Admin/Auth/login');
    } else {
        next()
    }


    // Check web token exists & verified
    // if (token) {
    //     session.verify(token, 'secret token', (err, decodedToken) => {
    //         if (err) {
    //             console.log(err.message);
    //             res.redirect('/admin/login');
    //         } else {
    //             next();
    //         }
    //     });
    // } else {
    //     res.redirect('/admin/login');
    // }
}

module.exports = requireAuth;