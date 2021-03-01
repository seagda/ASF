const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers["x-access-token"];

    console.log(req.body)
    if (!token) return res.status(403).send({ message: "No token provided!" });
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(401).send({ message: "Unauthorized!" });
        req.userId = decoded.id;
        req.roles = decoded.roles;
        next();
    });
}