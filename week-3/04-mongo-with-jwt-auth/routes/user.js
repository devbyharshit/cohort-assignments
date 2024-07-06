const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");

// User Routes
router.post("/signup", async (req, res) => {
	const { username, password } = req.body;
	const response = await User.create({ username, password });

	if (response) res.send({ message: "User created successfully" });
});

router.post("/signin", async (req, res) => {
	const { username, password } = req.body;
	const response = await User.find({ username, password });

	if (response) {
		const token = jwt.sign({ username }, "MY_SECRET");
		res.send({ token });
	} else
		res.status(411).send({
			message: "Incorrect email and password",
		});
});

router.get("/courses", async (req, res) => {
	const courses = await Course.find();

	if (courses) res.send({ courses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
	const { username } = res.locals;
	const { courseId } = req.params;

	const user = await User.updateOne({ username }, { $push: { purchasedCourses: courseId } });

	if (user) res.send({ message: "Course purchased successfully" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
	const { username } = res.locals;
	const user = await User.findOne({ username });

	const courses = await Course.find({
		_id: {
			$in: user.purchasedCourses,
		},
	});

	if (courses) res.send({ purchasedCourses: courses });
});

module.exports = router;
