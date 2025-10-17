const express = require("express");
const { RPCObserver, RPCRequest } = require("./rpc");
const PORT = 9001;

const app = express();
app.use(express.json());

const fakeResponse = {
  _id: "yt0918901ueidf",
  name: "Brian",
  country: "Vietnam",
};

RPCObserver("CUSTOMER_RPC", fakeResponse);

app.get("/wishlist", async (req, res) => {
  const requestPayload = {
    productId: "123",
    customerId: "yt0918901ueidf",
  };
  try {
    const responseData = await RPCRequest("PRODUCT_RPC", requestPayload);
    console.log(responseData);
    return res.status(200).json(responseData);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get("/", async (req, res) => {
  return res.json("Customer Service");
});

app.listen(PORT, () => {
  console.log(`Customer is running on port ${PORT}`);
  console.clear();
});
