const express = require("express");
const router = require("./routes");

const app = express();
const port = process.env.PORT || 5000;

app.set("view engine", "pug");
app.use("/", router);

app.listen(port, () => {
  console.log(`Node is listening at http://localhost:${port}`);
});
