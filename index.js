const express = require('express');
const app = express();
const port = 9000;

const db = require('./config/mongoose');


const MongoStore = require('connect-mongo');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session')
const customMware = require('./config/middleware');


app.use(express.urlencoded());

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
  }));

 app.use(flash());
app.use(customMware.setFlash);
// use express router
app.use('/', require('./routes/users'));
// app.use('/', routes);
// app.use('/users', users);
app.use(  'create' ,express.static(path.join(__dirname, 'create')));

app.get('/', function (req, res) {
    res.send('cool, it is running on portal');
});

// app.get('/', function (req, res) {
//     res.render('cool, it is running on portal');
// });



app.listen(port, function (err) {
    if (err) {
        console.log('Error in running the server:', err);
    }

    console.log('Server is running on port:', port);
});