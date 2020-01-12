const express = require('express')
const bodyparser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const loginRoute = require('./routes/login');
const dashRoute = require('./routes/dashboard');
const orderRoute = require('./routes/order');
const clientRoute = require('./routes/client');
const salesmanRoute = require('./routes/salesman');
const productRoute = require('./routes/product');
const marketRoute = require('./routes/market');

const fs = require('fs');
const dateformat = require('dateformat');

const app = express();

app.set('view engine','ejs');
app.use(expressLayouts);
app.set('views','views');

app.use(bodyparser.urlencoded({extended:true}));
app.use("/Sumeru",express.static(path.join(__dirname,'public')));
app.use(session({store:new FileStore({fileExtension:'.txt'}),secret:'secretfor key',key:'sumeru_sid',resave:false,saveUninitialized:false}));

app.use('/Sumeru/login',loginRoute.routes);
app.use('/Sumeru/dashboard',dashRoute.routes);
app.use('/Sumeru/order',orderRoute.routes);
app.use('/Sumeru/client',clientRoute.routes);
app.use('/Sumeru/salesman',salesmanRoute.routes);
app.use('/Sumeru/product',productRoute.routes);
app.use('/Sumeru/market',marketRoute.routes);

app.use((req,res,next)=>{
    //console.log(filepath);
    res.status(404).render('page/404',{pageTitle:'Page Not Found'});
});


app.listen(3001);