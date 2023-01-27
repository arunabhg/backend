const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.json({
		mesg: "Hello from Backend!"
	});
});

app.listen(3000);
