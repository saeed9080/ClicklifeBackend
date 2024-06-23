const query = require("../config/db")
const axios = require('axios');
const sdk = require('@api/dev-hub');

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
            sdk.auth('redahashim2020@yahoo.com', '561009599');
            sdk.postAccessTokenPOST({
                    grant_type: 'client_credentials'
                })
                .then(({
                    data
                }) => {
                    sdk.auth(data.access_token);
                    sdk.sendSmsToSimUsingPOST(`{"payload":${smsmessage}, "source_address":"ClickLife","expiry_date":"2018-03-14T16:10:29.000+0000"}`, {
                            iccid: phone,
                            'content-type': 'application/json;charset=UTF-8'
                        })
                        .then(response => {
                            console.log('Response: ', response);
                            res.status(200).send({
                                success: true,
                                response: response,
                            });
                        })
                        .catch(error => {
                            console.error('Error: ', error);
                            res.status(500).send({
                                success: false,
                                message: error.message,
                            });
                        });
                }).catch(err => console.error(err));
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
            sdk.auth('redahashim2020@yahoo.com', '561009599');
            sdk.postAccessTokenPOST({
                    grant_type: 'client_credentials'
                })
                .then(({
                    data
                }) => {
                    sdk.auth(data.access_token);
                    sdk.sendSmsToSimUsingPOST(`{"payload":${smsmessage}, "source_address":"ClickLife","expiry_date":"2018-03-14T16:10:29.000+0000"}`, {
                            iccid: phone,
                            'content-type': 'application/json;charset=UTF-8'
                        })
                        .then(response => {
                            console.log('Response: ', response);
                            res.status(200).send({
                                success: true,
                                response: response,
                            });
                        })
                        .catch(error => {
                            console.error('Error: ', error);
                            res.status(500).send({
                                success: false,
                                message: error.message,
                            });
                        });
                }).catch(err => console.error(err));
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