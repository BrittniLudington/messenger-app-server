const express = require('express');
const client = require('./client');
const {requireAuth} = require('./middleware/auth');

let userRoutes = express.Router();

//userRoutes.all(requireAuth);


userRoutes.get('/users',(req,resApp)=>
{
    client.query(`SELECT * from users;`,(err,res)=>
    {
        if(err)throw err;
        resApp.status(200).jsonp(res.rows);
    })
});


userRoutes.get('/users/MyAccount',requireAuth,(req,resApp)=>
{
    resApp.status(200).jsonp({name:req.name,id:req.id});
})

userRoutes.get('/users/:user',(req,resApp)=>
{
    client.query(`SELECT * from users WHERE id = ${req.params.user}`,(err,res)=>
    {
        if(err)throw err;
        resApp.status(200).jsonp({name:res.rows[0].name,id:res.rows[0].id});
    })
});

userRoutes.get('/search/:query',(req,resApp)=>
{
    let query = req.params.query;
    client.query(`SELECT name, id from users WHERE cleanname ILIKE '%${query}%' OR cleanname ILIKE '%${query}' OR cleanname ILIKE '${query}%'`,(err,res)=>
    {
        if(err)throw err;
        resApp.status(200).jsonp(res.rows);
    })
});


userRoutes.post('/users',(req,resApp)=>
{
    if(req.body.name === undefined || req.body.name === "" || req.body.password === undefined || req.body.password === "")
    {
        resApp.status(400).jsonp("bad request");
        return;
    }
    client.query(`SELECT MAX(id) from users`,(err,resOne)=>
    {
        if(err)throw err;
        let count = resOne.rows[0].max + 1;
        let name = Buffer(req.body.name,"base64").toString();
        client.query(`INSERT into users (name,password,id,cleanname) values ('${req.body.name}','${req.body.password}',${count},'${name}')`,(errOne,resTwo)=>
        {
            if(errOne)throw errOne;
            resApp.status(200).jsonp("Success");
        })
        
    })
    

})

module.exports = userRoutes;