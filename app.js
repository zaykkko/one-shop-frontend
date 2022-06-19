const express = require("express");
const path = require("path");
const history = require("connect-history-api-fallback");
const serveStatic = require("serve-static");

const app = express();
const port = process.env.PORT || 3000;

app.use(
    history({
        disableDotRule: true,
    })
);
app.use(serveStatic(path.resolve(__dirname, "build"), {index: ["index.html"]}));
app.use(serveStatic(path.resolve(__dirname, "static")));

app.listen(port, () => console.log(`App is live on port ${port}!`));
