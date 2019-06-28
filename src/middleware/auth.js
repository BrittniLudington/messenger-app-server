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
    const [tokenUserName, tokenPassword] = Buffer
    .from(basicToken,'base64')
    .toString()
    .split(':');
    console.log(tokenUserName,tokenPassword, !tokenUserName, !tokenPassword);
    if(!tokenUserName || !tokenPassword)
    {
        return res.status(401).json({error:"Unauthorized request"});
    }
    client.query(`SELECT * from users WHERE name = '${tokenUserName}'`,(err,resOne)=>
    {
        if(err) throw err;
        if(resOne.rows.length === 0) // no users of that name found
        {
            return res.status(401).json({ error: 'Unauthorized request' });
        }
        console.log("USER FOUND");
        next();
    })
}

module.exports = {requireAuth}