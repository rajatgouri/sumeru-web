const express = require('express');
const path = require('path');
const request = require('request');
const filepath = require("../utils/path");

const config = require('../configurations/rest_api_config.json');
const route = express.Router();
const is_auth = require('../middleware/is_auth');

/**
 * 
 */
route.get("/",(req,res,next)=>{
    res.render('page/login',{pageTitle:"Ajay Soap Mills Pvt Ltd | Login"});
});

/**
 * 
 */
route.post("/signin",(req,res,next)=>{
    console.log(req.body);
    var inputobj = { username:req.body.username,passwd:req.body.password};
    request.post(config['development']['url'] + "user/ulogin",{
        json:{
            inputObj:inputobj
        }
    },(error,resp,body)=>{
        try{

            if(error){
                console.log(error);
                res.send({result:"ERROR",data:"!!! Problem in Server communication"});
                return;
            }
            if ('outputObj' in body){
                console.log(body.outputObj);
                req.session.userinfo = {id:body.outputObj.u_uid, token:body.outputObj.token, role:body.outputObj.authority, name:body.outputObj.u_name};
                req.session.isLoggedIn = true;
                req.session.save((err)=>{
                    if(err){
                        console.log(err);
                        res.send({result:"ERROR",data:"!!!Problem saving session data"});        
                    }
                    res.send({result:"SUCCESS",data:body.outputObj.u_name});
                });
            }else{
                console.log(body.error);
                res.send({result:"ERROR",data:body.error['message']});
            }

        }catch(err){
            console.log(body.error);
            res.send({result:"ERROR",data:"!!! Unknown Error occured"});
        }
    });
});

module.exports.routes = route;