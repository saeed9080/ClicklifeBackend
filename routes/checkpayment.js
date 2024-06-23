const express = require("express");
const { getAllPayments, searchController } = require("../controllers/checkPaymentController");

// express router
const router = express.Router();
// get-all-payments
router.get("/get-all-payments", getAllPayments);
//search
router.post("/search", searchController);

module.exports = router;
