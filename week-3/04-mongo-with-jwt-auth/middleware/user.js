const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
	const { authorization } = req.headers;
	const token = authorization.split(" ")[1];

	try {
		const verifiedPayload = jwt.verify(token, "MY_SECRET");
		if (verifiedPayload.username) {
			res.locals.username = verifiedPayload.username;
			next();
		} else res.status(403).send({ message: "User is unathorized." });
	} catch (error) {
		res.status(401).send({ message: "Bad Token." });
	}
}

module.exports = userMiddleware;
