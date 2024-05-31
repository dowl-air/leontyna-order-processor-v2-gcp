const soap = require("strong-soap").soap;

const url = "https://api.kontri.pl:8866/KontriAPIservice.svc?wsdl";
const username = process.env.KONTRI_API_USER;
const password = process.env.KONTRI_API_PASSWORD;

function createClient() {
    return new Promise((resolve, reject) => {
        const options = {
            wsdl_headers: {
                Authorization: "Basic " + Buffer.from(username + ":" + password).toString("base64"),
            },
        };
        soap.createClient(url, options, (err, client) => {
            if (err) {
                return reject(err);
            }
            client.setSecurity(new soap.BasicAuthSecurity(username, password));
            resolve(client);
        });
    });
}

async function sendOrder(orderObject) {
    const client = await createClient();
    const orderWithItems = {
        ...orderObject,
        OrderedItems: {
            OrderedItem: orderObject.OrderedItems,
        },
    };
    return new Promise((resolve, reject) => {
        client.AddOrder({ Order: orderWithItems }, (err, result) => {
            if (err) {
                return reject(err);
            }
            console.log(client.lastRequest);
            resolve(result);
        });
    });
}

module.exports = {
    createClient,
    sendOrder,
};
