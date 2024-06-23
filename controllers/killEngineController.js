const query = require("../config/db")
const axios = require('axios');

// get all deleted vehicles

const getAllVehicles = async (req, res) => {
    try {
        const {
            limit = 10, offset = 0
        } = req.query;
        const vehiclesresults = await query('SELECT * FROM vehicle');
        const result = await query(`SELECT * FROM vehicle LIMIT ${limit} OFFSET ${offset}`)
        res.status(200).send({
            success: true,
            result,
            vehiclesresults
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
        const {
            Vehicle_Label,
            Client,
            IMEI,
            Sim_Number
        } = req.body;
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

const engineOnSendMessage = async (req, res) => {
    try {
        const {
            phone,
            model
        } = req.body;
        console.log(model)
        console.log(phone)
        const smsCommandsQuery = `SELECT * FROM sms_commands`;
        const smscommandsresult = await query(smsCommandsQuery);
        let smsmessage = '';
        for (const record of smscommandsresult) {
            if (record.model === model) {
                smsmessage = record.on_val;
                break; // Stop after finding the first match
            }
        }

        if (!smsmessage) {
            res.status(404).send({
                success: false,
                message: 'No matching model found in sms_commands.',
            });
            return;
        }

        if (phone.length > 11) {
            const options = {
                method: 'POST',
                url: 'https://api.1nce.com/management-api/oauth/token',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    authorization: 'Basic cmVkYWhhc2hpbTIwMjBAeWFob28uY29tOjU2MTAwOTU5OQ=='
                },
                data: {
                    grant_type: 'client_credentials'
                }
            };
            axios.request(options)
                .then(function (response) {
                    console.log(response.data.access_token);
                    const options = {
                        method: 'POST',
                        url: `https://api.1nce.com/management-api/v1/sims/${phone}/sms`,
                        headers: {
                          accept: 'application/json',
                          'content-type': 'application/json;charset=UTF-8',
                          authorization: `Bearer ${response.data.access_token}`
                        },
                        data: `{"payload":${smsmessage},"source_address":"ClickLife"}`
                      };
                      axios.request(options)
                        .then(function (response) {
                          console.log(response.data);
                          res.status(200).send({
                            success: true,
                            response: response.data,
                        });
                        }).catch(function (error) {
                          console.error(error);
                          res.status(500).send({
                            success: false,
                            message: error.message,
                        });
                        });
                })
                .catch(function (error) {
                    console.error(error);
                    res.status(500).send({
                        success: false,
                        message: error.message,
                    });
                });
        } else {
            // Prepare the data in the required format
            const smsData = [{
                user: '20099576', // Replace with your profile ID
                pwd: 'Clicklife@123', // Replace with your password
                number: phone, // Replace with the recipient's mobile number including country code
                msg: smsmessage, // Your text message
                sender: '36046831', // Replace with your sender ID
                language: 'English', // Language set to English
            }];
            // Send the request
            axios.post('https://mshastra.com/sendsms_api_json.aspx', smsData)
                .then(response => {
                    console.log('Response: ', response.data);
                    res.status(200).send({
                        success: true,
                        response: response.data,
                    });
                })
                .catch(error => {
                    console.error('Error: ', error);
                    res.status(500).send({
                        success: false,
                        message: error.message,
                    });
                });
        }
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
};

const engineOffSendMessage = async (req, res) => {
    try {
        const {
            phone,
            model
        } = req.body;
        console.log(model)
        const smsCommandsQuery = `SELECT * FROM sms_commands`;
        const smscommandsresult = await query(smsCommandsQuery);
        let smsmessage = '';
        for (const record of smscommandsresult) {
            if (record.model === model) {
                smsmessage = record.off_val;
                break; // Stop after finding the first match
            }
        }

        if (!smsmessage) {
            res.status(404).send({
                success: false,
                message: 'No matching model found in sms_commands.',
            });
            return;
        }

        if (phone.length > 11) {
            const options = {
                method: 'POST',
                url: 'https://api.1nce.com/management-api/oauth/token',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    authorization: 'Basic cmVkYWhhc2hpbTIwMjBAeWFob28uY29tOjU2MTAwOTU5OQ=='
                },
                data: {
                    grant_type: 'client_credentials'
                }
            };
            axios.request(options)
                .then(function (response) {
                    console.log(response.data.access_token);
                    const options = {
                        method: 'POST',
                        url: `https://api.1nce.com/management-api/v1/sims/${phone}/sms`,
                        headers: {
                          accept: 'application/json',
                          'content-type': 'application/json;charset=UTF-8',
                          authorization: `Bearer ${response.data.access_token}`
                        },
                        data: `{"payload":${smsmessage},"source_address":"ClickLife"}`
                      };
                      axios.request(options)
                        .then(function (response) {
                          console.log(response.data);
                          res.status(200).send({
                            success: true,
                            response: response.data,
                        });
                        }).catch(function (error) {
                          console.error(error);
                          res.status(500).send({
                            success: false,
                            message: error.message,
                        });
                        });
                })
                .catch(function (error) {
                    console.error(error);
                    res.status(500).send({
                        success: false,
                        message: error.message,
                    });
                });
        } else {
            // Prepare the data in the required format
            const smsData = [{
                user: '20099576', // Replace with your profile ID
                pwd: 'Clicklife@123', // Replace with your password
                number: phone, // Replace with the recipient's mobile number including country code
                msg: smsmessage, // Your text message
                sender: '36046831', // Replace with your sender ID
                language: 'English', // Language set to English
            }];
            // Send the request
            axios.post('https://mshastra.com/sendsms_api_json.aspx', smsData)
                .then(response => {
                    console.log('Response: ', response.data);
                    res.status(200).send({
                        success: true,
                        response: response.data,
                    });
                })
                .catch(error => {
                    console.error('Error: ', error);
                    res.status(500).send({
                        success: false,
                        message: error.message,
                    });
                });
        }
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
}

module.exports = {
    getAllVehicles,
    engineOnSendMessage,
    engineOffSendMessage,
    searchController,
}