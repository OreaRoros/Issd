const con = require('../config/db');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    if (req.session.loggedin) {
        return res.redirect('/admin'); //redirect to home
    } else
        req.session.loggedin = false;
    return res.render('Backend/Admin/Auth/login', { data: { email: "" } });
}

exports.loginSubmit = async (req, res) => {
    const data = req.body;
    if (data.email && data.password) {
        con.query('SELECT * FROM user WHERE email = ? ', [data.email],
            async function (error, results, fields) {
                if (error) {
                    return res.render('Backend/Admin/Auth/login', { error: error, data });
                }
                if (results.length > 0) {
                    if (!await bcrypt.compare(data.password, results[0].password)) {
                        return res.render('Backend/Admin/Auth/login', { error: 'Mot de passe incorrect', data });
                    }
                    req.session.loggedin = true;
                    const { password, ...user } = await results[0];
                    req.session.user = user;
                    return res.redirect('/admin');
                } else {
                    return res.render('Backend/Admin/Auth/login', { error: 'Incorrect Email', data });
                }
            });
    } else {
        return res.render('Backend/Admin/Auth/login', { error: 'Completez le champ email et password' });
    }
}

exports.register = async (req, res) => {
    if (req.session.loggedin && !req.session.lockScreen) {
        return res.redirect('/admin');
    } else
        if (req.session.loggedin && req.session.lockScreen) {
            return res.redirect('/auth/lock_screen');
        } else {
            req.session.lockScreen = false;
            req.session.loggedin = false;
            return res.render('Backend/Admin/Auth/signup', { data: { email: "", username: "" } });
        }
}

exports.registerSubmit = async (req, res) => {
    const data = req.body;
    if (data.password == data.password1) {
        const salt = await bcrypt.genSalt(10);
        //console.log(req.body.email+' '+req.body.password);
        const hashedPassword = await bcrypt.hash(data.password, salt);
        con.query("INSERT INTO user(username, email, password) values ( ?, ?, ?)",
            [data.username, data.email, hashedPassword], async (error, list) => {
                if (error) {
                    console.log(error);
                    return res.render('Backend/Admin/Auth/signup', { error: error, data });
                } else {
                    con.query('SELECT * FROM user WHERE email = ? ', [data.email],
                        async function (error, results, fields) {
                            if (error) { res.status(400).send(error); }
                            if (results.length > 0) {
                                req.session.loggedin = true;
                                const { password, ...user } = await results[0];
                                req.session.user = user;
                                return res.redirect('/admin');
                            } else {
                                return res.render('Backend/Admin/Auth/signup', { error: 'Incorrect Email', data });
                            }
                        });
                }
            })
    } else {
        return res.render('Backend/Admin/Auth/signup', { error: 'Mot de passe non identique', data });
    }
}

exports.logout = async (req, res) => {
    req.session.destroy();
    return res.render('Backend/Admin/Auth/login');
}