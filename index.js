const express = require("express");
const erc20 = require("./Routes/ERC-20")

const app = express();
const startServer = () => {
  try {
    app.listen(8080);
  } catch (error) {
    console.log(error);
  }
};
//starting to listen for requests on port 8080 and allowing requests to accept json
startServer();
app.use(express.json());

app.use('/api/ERC-20-info',erc20)
app.use((req, res) => {
  res.status(404).send("404 not found");
});