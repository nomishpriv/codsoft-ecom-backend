const express = require("express");
const { Signup, Login } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = express.Router();
const Products = require('../models/ProductModels')



// router.get("/", (req, res) => {
//   res.send("home");
// });

router.get("/getall", async (req, res) => {
  const getall = await Products.find()
  res.status(200).json(getall);
});

router.get("/get/:categoryName", async (req, res) => {
  const { categoryName } = req.params;
  console.log(categoryName)
  const getCategoryName = await Products.find({categoryName})
  console.log(getCategoryName)
  
  return res.status(200).json(getCategoryName);
});

router.get("/getProduct/:id", async (req, res) => {
  const { id } = req.params;
  const getProductId = await Products.find({id})
  console.log(getProductId)

  return res.status(200).json(getProductId);
});

router.post('/',userVerification)

router.post('/signup', Signup)
router.post('/login', Login)

router.post('/logout', (req, res) => {
  res.clearCookie("token")
  res
    .status(201)
    .json({ message: "User Logout in successfully", success: true })
})

module.exports = router;
