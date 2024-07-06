const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const jwt = require("jsonwebtoken");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
	const { username, password } = req.body;
	const response = await Admin.create({ username, password });

	if (response) res.send({ message: "Admin created successfully" });
});

router.post("/signin", async (req, res) => {
	const { username, password } = req.body;
	const response = await Admin.find({ username, password });

	if (response) {
		const token = jwt.sign({ username }, "MY_SECRET");
		res.send({ token });
	} else
		res.status(411).send({
			message: "Incorrect email and password",
		});
});

router.post("/courses", adminMiddleware, async (req, res) => {
	const { title, description, imageLink, price } = req.body;
	const course = await Course.create({ title, description, imageLink, price });

	if (course) res.send({ message: "Course created successfully", courseId: course._id });
});

router.get("/courses", adminMiddleware, async (req, res) => {
	const courses = await Course.find();

	if (courses) res.send({ courses });
});

module.exports = router;
