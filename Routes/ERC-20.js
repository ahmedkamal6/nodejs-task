const express = require("express");
const Web3 = require("web3");
const erc20abi = require("../erc20abi");
require("dotenv").config();
const router = express.Router();

//post request takes the contract address through request body and sending back the info with success = true
const web3 = new Web3(process.env.INFURA_KEY_PROVIDER);
router.route("/").post(async (req, res) => {
  try {
    const { contractAddress } = req.body;
    const contract = new web3.eth.Contract(erc20abi, contractAddress);
    const name = await contract.methods.name().call();
    const symbol = await contract.methods.symbol().call();
    const totalSupply = await contract.methods.totalSupply().call();
    
    res.status(200).json({ success: true, name, symbol, totalSupply });
  } catch (error) {
    if (error.message.includes("is invalid"))
      res
        .status(404)
        .json({ success: false, error: "ERC Contract not found or invalid" });
    else res.status(500).json({ success: false,error: error.message });
  }
});
module.exports = router;
