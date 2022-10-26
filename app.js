const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();


//use express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.json());
// Moteur de Template
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./src/middleware/flash'));

//Routes
const home = require('./src/routes/home.route');
const auth = require('./src/routes/auth.route');
const admin = require('./src/routes/admin.route');
app.use(home);
app.use(auth);
app.use(admin);

// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// Error 404
app.use(function (req, res) {
    res.status(404);
    if (req.accepts('html')) {
        return res.render('err/e404')
    }
});