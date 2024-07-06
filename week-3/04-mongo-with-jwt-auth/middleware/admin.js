const jwt = require("jsonwebtoken");
// Middleware for handling auth
function adminMiddleware(req, res, next) {
	const { authorization } = req.headers;
	const token = authorization.split(" ")[1];

	try {
		const verifiedPayload = jwt.verify(token, "MY_SECRET");
		if (verifiedPayload.username) next();
		else res.status(403).send({ message: "Admin is unathorized." });
	} catch (error) {
		res.status(401).send({ message: "Bad Token." });
	}
}

module.exports = adminMiddleware;
