const express = require('express');
const client = require('./client');
const {requireAuth} = require('./middleware/auth');


let messageRoutes = express.Router();

messageRoutes.post('/sending',requireAuth,(req,resApp)=>
{
    client.query(`SELECT MAX(id) from messages`,(errOne,resOne)=>
    {
        if(errOne)throw errOne;
        let count = resOne.rows[0].max + 1;

        client.query(`INSERT into messages values('${req.body.header}',${req.id},${req.body.to},NOW(),'${req.body.subject}',false,true,${count})`,(errTwo,resTwo)=>
        {
            if(errTwo)throw errTwo;
            resApp.status(200).jsonp("success");
        })
    })
})

messageRoutes.put('/sending/:id',(req,resApp)=>
{
    client.query(`UPDATE messages set toread = true  where id = ${req.params.id} `,(err,res)=>
    {
        if(err)throw err;
        resApp.status(200).jsonp("success");
    })
})

messageRoutes.get('/sending',(req,resApp)=>
{
    client.query(`Select * from messages`,(err,res)=>
    {
        if(err)throw err;
        resApp.status(200).jsonp(res.rows);
    })
})

messageRoutes.get('/messages/:id',(req,resApp)=>
{
    client.query(`SELECT * from messages WHERE "to" = ${req.params.id} OR "from" = ${req.params.id}`,(err,res)=>
    {
        if(err)throw err;
        resApp.status(200).jsonp(res.rows);
    })
})

module.exports = messageRoutes;