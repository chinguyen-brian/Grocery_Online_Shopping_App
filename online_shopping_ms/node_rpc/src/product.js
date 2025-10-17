const express = require("express");
const { RPCObserver, RPCRequest } = require("./rpc");
const PORT = 9002;

const app = express();
app.use(express.json());

const fakeResponse = {
  _id: "pd12389udfiu9492",
  title: "Iphone",
  price: 599,
};

RPCObserver("PRODUCT_RPC", fakeResponse);

app.get("/customer", async (req, res) => {
  const requestPayload = {
    customerId: "yt0918901ueidf",
  };
  try {
    const responseData = await RPCRequest("CUSTOMER_RPC", requestPayload);
    console.log(responseData);
    return res.status(200).json(responseData);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get("/", (req, res) => {
  return res.json("Product Service");
});

app.listen(PORT, () => {
  console.log(`Product is running on port ${PORT}`);
  console.clear();
});
