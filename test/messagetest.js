
const app = require('../src/app');
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
chai.should();

describe('MessageRoutes',()=>
{
    it('POST /sending successfully posts a message for an authenticated user',(done)=>
    {
        const credentials =
        {
            name: "test",
            password: "1234"
        }

        const message =
        {
            header: "testing",
            subject: "chai tester",
            to: 2
        }

        let token = new Buffer(credentials.name + ":" + credentials.password);
        chai.request(app).post('/sending').set('Authorization',`basic ${token.toString('base64')}`).send(message)
        .end((err,res)=>
        {
            res.should.have.status(200);
            done();
        })
    });

    it('GET /sending returns all messages',(done)=>
    {
        chai.request(app).get('/sending')
        .end((err,res)=>
        {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        })
    });

    it('GET /messages/:id returns messages sent by or received by user with that id',(done)=>
    {
        chai.request(app).get('/messages/1')
        .end((err,res)=>
        {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        })
    })

    it('POST /sending should return 401 if a piece of the message is undefined',(done)=>
    {
        const credentials =
        {
            name: "test",
            password: "1234"
        }

        const message =
        {
            subject: "hi",
            to: 2
        }

        let token = new Buffer(credentials.name + ":" + credentials.password);
        chai.request(app).post('/sending').set('Authorization',`basic ${token.toString('base64')}`).send(message)
        .end((err,res)=>
        {
            res.should.have.status(401);
            done();
        })
    })
})