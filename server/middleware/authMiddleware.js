const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        
        const token = req.headers.authorization.split(' ')[1] // Bearer { token }
        if(!token) {
            return res.status(401).json({ message: "User not authorized" })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY) // validity check
        req.user = decoded 
        next()

    } catch (e) {
        return res.status(401).json({ message: "User not authorized" })
    }
}