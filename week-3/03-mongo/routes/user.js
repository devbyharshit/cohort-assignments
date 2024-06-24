const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", async (req, res) => {
	const { username, password } = req.body;
	const user = await User.create({ username, password });

	if (user) res.send({ message: "User created successfully" });
});

router.get("/courses", async (req, res) => {
	const courses = await Course.find();

	if (courses) res.send({ courses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
	const { username } = req.headers;
	const { courseId } = req.params;

	const user = await User.updateOne({ username }, { $push: { purchasedCourses: courseId } });

	if (user) res.send({ message: "Course purchased successfully" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
	const { username } = req.headers;
	const user = await User.findOne({ username });
	const courses = await Course.find({
		_id: {
			$in: user.purchasedCourses,
		},
	});

	if (courses) res.send({ purchasedCourses: courses });
});

module.exports = router;
