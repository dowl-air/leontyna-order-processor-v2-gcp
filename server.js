const express = require("express");
const cors = require("cors");

const sendOrdersRouter = require("./routes/sendOrders");

const app = express();
app.use(express.json());
app.use(cors());

const port = 8080;

app.listen(port, () => {
    console.log("Server is running on port " + port);
});

app.use("/api/sendOrder", sendOrdersRouter);
