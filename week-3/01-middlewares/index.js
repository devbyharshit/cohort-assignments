const server1 = require("./01-requestcount.js");
const server2 = require("./02-ratelimitter.js");
const server3 = require("./03-errorcount.js");

const port = 3000;
server1.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
