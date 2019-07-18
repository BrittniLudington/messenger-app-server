const app = require('../src/app');
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
chai.should();

describe('UserRoutes',()=>
{
    it('GET /users returns an array of all users',(done)=>
    {
        chai.request(app).get('/users')
        .end((err,res)=>
        {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        })
    });

    it('GET /users/MyAccount returns information of user if authenticated',(done)=>
    {
        const credentials =
        {
            name: "test",
            password: "1234"
        }

        let token = new Buffer(credentials.name + ":" + credentials.password);
        //console.log(token,token.toString('base64'),token.toString());
        chai.request(app).get('/users/MyAccount').set('Authorization',`basic ${token.toString('base64')}`)
        .end((err,res)=>
        {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        })
    });

    it('GET /users/MyAccount returns 401 if authentication is false',(done)=>
    {
        const credentials =
        {
            name: "test",
            password: "wrong password"
        }

        let token = new Buffer(credentials.name + ":" + credentials.password);
        //console.log(token,token.toString('base64'),token.toString());
        chai.request(app).get('/users/MyAccount').set('Authorization',`basic ${token.toString('base64')}`)
        .end((err,res)=>
        {
            res.should.have.status(401);
            done();
        })
    })

    it('GET /users/:user returns the users name and id when sent an id',(done)=>
    {
        chai.request(app).get('/users/1')
        .end((err,res)=>
        {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        })
    });

    it('GET /search/:query returns an array of users going by that query. Atleast one account should appear with query "test"',(done)=>
    {
        chai.request(app).get('/search/test')
        .end((err,res)=>
        {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.gt(0);
            done();
        })
    });

    it('POST /users returns a status of 200 if both password and username are given',(done)=>
    {
        chai.request(app).post('/users').send({'name':'icarus','password':'hubba'})
        .end((err,res)=>
        {
            res.should.have.status(200);
            done();
        })
    })

    it('POST /users returns a status of 400 if username or password is missing',(done)=>
    {
        chai.request(app).post('/users').send({'name':'exists','password':undefined})
        .end((err,res)=>
        {
            res.should.have.status(400);
            done();
        })
    })
});