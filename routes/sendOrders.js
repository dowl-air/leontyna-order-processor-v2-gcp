const express = require("express");
const { sendOrder } = require("../kontri-api/soapClient");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        //get order from request body
        const order = req.body.order;
        const resp = await sendOrder(order);
        console.log(resp);
        res.json({ status: "Success", result: resp.AddOrderResult });
    } catch (error) {
        console.log(error);
        res.json({ status: "Error", result: error });
    }
});

module.exports = router;
