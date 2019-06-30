const client = require('../client');
function requireAuth(req,res,next)
{
    const token = req.get('Authorization') || '';

    let basicToken;
    if(!token.toLowerCase().startsWith('basic '))
    {
        return res.status(401).json({error:"Missing basic"});
    }else
    {
        basicToken = token.slice('basic '.length, token.length);
    }
    //console.log(Buffer.from(basicToken,'base64').toString());
    let [tokenUserName, tokenPassword] = Buffer
    .from(basicToken,'base64')
    .toString()
    .split(':');
    if(!tokenUserName || !tokenPassword)
    {
        return res.status(401).json({error:"Unauthorized request"});
    }
    tokenUserName = new Buffer(tokenUserName).toString('base64');
    tokenPassword = new Buffer(tokenPassword).toString('base64');
    client.query(`SELECT * from users WHERE name = '${tokenUserName}' and password = '${tokenPassword}'`,(err,resOne)=>
    {
        if(err) throw err;
        if(resOne.rows.length === 0) // no users of that name found
        {
            return res.status(401).json({ error: 'Unauthorized request' });
        }
        console.log("USER FOUND");
        req.name = tokenUserName;
        req.id = resOne.rows[0].id;
        next();
    })
}

module.exports = {requireAuth}