const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
	const { username, password } = req.headers;
	const result = await Admin.findOne({ username, password });

	if (result) next();
	else res.status(403).send({ message: "Admin is unathorized." });
}

module.exports = adminMiddleware;
