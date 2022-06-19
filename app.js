const express = require("express");
const path = require("path");
const history = require("connect-history-api-fallback");

const app = express();
const port = process.env.PORT || 3000;

app.disable("x-powered-by");
app.use(history());
app.use("/static", express.static(path.resolve(__dirname, "static")));
app.use("/", express.static(path.resolve(__dirname, "build")));

app.listen(port, () => console.log(`App is live on port ${port}!`));
