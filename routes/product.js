const express = require('express');
const path = require('path');
const request = require('request');
const dateformat = require('dateformat');
const filepath = require("../utils/path");
const config = require('../configurations/rest_api_config.json');
const route = express.Router();
const isAuth = require('../middleware/is_auth');
//const isAuth_ajax = require('../middleware/is_auth_ajax');
const generalUtils = require("../utils/general_utils");

route.get("/",isAuth,(req,res,next)=>{

    var headers = {
        "arya-token": req.session.userinfo.token
    };
    var inputObj = {
        u_id: req.session.userinfo.id
    };
    var reqPromisebillmockuptotal = generalUtils.createREQUEST(request, inputObj, headers, req, config['development']['url'] + "product/list");

    reqPromisebillmockuptotal.then((value) => {
        console.log(value);
        let prods = ('errorObj' in value) ? [] : value.outputObj.list;

        var userInfo = {username:req.session.userinfo.name, userid:req.session.userinfo.id};
        res.render('page/product',{userinfo:userInfo,page:'/product',pageTitleName:"Products",pageTitle:"Ajay Soap Mills | Products", prods:prods});


        // if('errorObj' in value){
        //     res.send({
        //         result: 'ERROR',
        //         data: value.errorObj.message
        //     });
        // }else{
        //     res.send({
        //         result: 'SUCCESS',
        //         data: value.outputObj.rpt
        //     });
        // }


    });
});


module.exports.routes = route;