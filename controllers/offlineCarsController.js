const query = require("../config/db")

// get all vehicles

const getAllVehicles = async (req, res) => {
    try {
        const { limit = 10, offset = 0 } = req.query;
        const offlinecarsresults = await query('SELECT * FROM vehicle');
        const result = await query(`SELECT * FROM vehicle LIMIT ${limit} OFFSET ${offset}`);
        console.log('offline cars result length:', result.length);
        res.status(200).send({ 
            success: true,
            result,
            offlinecarsresults
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message,
        })
    }
}

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
        console.log('results is ', results.length)
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
    searchController,
}