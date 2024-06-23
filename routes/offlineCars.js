const express = require("express");
const { getAllVehicles, searchController } = require("../controllers/offlineCarsController");

// express router
const router = express.Router();
// get-all-vehicles
router.get("/get-all-vehicles" ,getAllVehicles);
//search
router.post("/search",  searchController );

module.exports = router;
