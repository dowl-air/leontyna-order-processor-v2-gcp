const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");

const sendOrdersRouter = require("./routes/sendOrders");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = 8080;

app.listen(port, () => {
    console.log("Server is running on port " + port);
});

app.use("/api/sendOrder", sendOrdersRouter);
