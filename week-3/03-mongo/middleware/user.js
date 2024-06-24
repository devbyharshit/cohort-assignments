const { User } = require("../db");

async function userMiddleware(req, res, next) {
	const { username, password } = req.headers;
	const result = await User.findOne({ username, password });

	if (result) next();
	else res.status(403).send({ message: "Admin is unathorized." });
}

module.exports = userMiddleware;