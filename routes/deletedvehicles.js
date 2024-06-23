const express = require("express");
const { getAllDeletedVehicles, searchController } = require("../controllers/deletedVehiclesController");

// express router
const router = express.Router();
// get-all-deleted-vehicles
router.get("/get-all-deleted-vehicles" ,getAllDeletedVehicles);
//search
router.post("/search",  searchController );

module.exports = router;
