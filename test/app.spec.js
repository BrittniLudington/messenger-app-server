
const app = require('../src/app');
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
chai.should();
describe('App', () =>
{
    it('GET / responds with 200 containing intro', () =>
    {
        return supertest(app).get('/').expect(200, 'Welcome to the app of the private messaging server! For information on endpoints please view the read me at the github repository:https://github.com/BrittniLudington/messenger-app-server');
    });
})

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
})
