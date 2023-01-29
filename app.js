const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.json({
		mesg: "Hello from Arunabh"
	});
});

app.listen(3000);
