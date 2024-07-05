const express = require("express");
const { getAllVehicles, getClientData, searchController, generatePDFController } = require("../controllers/financeController");

// express router
const router = express.Router();
// get-all-vehicles
router.get("/get-all-vehicles" ,getAllVehicles);
// get-client-data
router.post("/get-client-data",  getClientData );
//search
router.post("/search",  searchController );
//generate-pdf
router.post("/generate-pdf",  generatePDFController );

module.exports = router;
