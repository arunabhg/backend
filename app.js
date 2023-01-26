const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.json({
		mesg: "Hello Backend"
	});
});

app.listen(3000);
