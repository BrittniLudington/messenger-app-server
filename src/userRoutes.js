const express = require('express');
const client = require('./client');

let userRoutes = express.Router();

userRoutes.get('/users',(req,resApp)=>
{
    client.query(`SELECT * from users;`,(err,res)=>
    {
        if(err)throw err;
        resApp.status(200).jsonp(res.rows);
    })
});

userRoutes.get('/users/:user',(req,resApp)=>
{
    client.query(`SELECT * from users WHERE name = '${req.params.user}'`,(err,res)=>
    {
        if(err)throw err;
        resApp.status(200).jsonp(res.rows[0]);
    })
});

userRoutes.get('/search/:query',(req,resApp)=>
{
    client.query(`SELECT * from users WHERE name ILIKE '%${req.params.query}%'`,(err,res)=>
    {
        if(err)throw err;
        resApp.status(200).jsonp(res.rows);
    })
});

userRoutes.post('/users',(req,resApp)=>
{
    console.log(req.body);
    client.query(`SELECT MAX(id) from users`,(err,resOne)=>
    {
        if(err)throw err;
        let count = resOne.rows[0].max + 1;
        client.query(`INSERT into users values ('${req.body.name}','${req.body.password}',${count})`,(errOne,resTwo)=>
        {
            if(errOne)throw err;
            resApp.status(200).jsonp("Success");
        })
        
    })

})

module.exports = userRoutes;