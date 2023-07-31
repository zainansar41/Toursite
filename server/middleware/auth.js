import jwt from 'jsonwebtoken'
export default async function auth(req,res,next){
    try {
        // access the authorized header
        const token = req.headers.authorization.split(" ")[1]
        
        const decodedToken = await jwt.verify(token,'@42/ahc')

        req.user= decodedToken

        next()
    } catch (error) {
        res.send({error:" authentication failed"})
    }
}