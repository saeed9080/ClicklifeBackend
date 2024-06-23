const query = require("../config/db")

// get all vehicles

const getAllVehicles = async (req, res) => {
    try {
        const { limit = 10, offset = 0 } = req.query;
        const vehiclesresults = await query('SELECT * FROM vehicle');
        const result = await query(`SELECT DISTINCT v.*, d.device_type FROM vehicle v LEFT JOIN devices d ON v.IMEI = d.IMEI LIMIT ${limit} OFFSET ${offset}`);
        console.log('vehicle result length:', result);
        res.status(200).send({ 
            success: true,
            result,
            vehiclesresults,
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message,
        })
    }
}

// get client data
const getClientData = async (req, res) => {
    try {
        const results = await query("SELECT Namee FROM client");
        res.status(200).json({
            success: true,
            message: "Get Client Data Successfully!",
            result: results
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        })
    }
};

// searchController 

const searchController = async (req, res) => {
    try {
        const { Vehicle_Label, Client, IMEI, Sim_Number } = req.body;
        console.log('Vehicle_Label:', Vehicle_Label);
        console.log('Client:', Client);
        console.log('IMEI:', IMEI);
        console.log('Sim_Number:', Sim_Number);

        let sql = `SELECT * FROM vehicle WHERE Vehicle_Label LIKE '%${Vehicle_Label}%' OR Client LIKE '%${Client}%' OR IMEI LIKE '%${IMEI}%' OR Sim_Number LIKE '%${Sim_Number}%'`;
        const results = await query(sql);
        res.status(200).json({
            success: true,
            message: "Search results",
            total_vehicle_length: results.length,
            result: results
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
};


module.exports = {
    getAllVehicles,
    getClientData,
    searchController,
}