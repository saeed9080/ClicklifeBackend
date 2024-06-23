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
            sdk.auth('eyJpZHRva2VuIjoiZXlKcmFXUWlPaUpVWlVkeWVqbExkbEJRWTNKYVdURXljRXBWUXpod2NYVjRVbnAxSzAxRU1HdENlRzh6Ukc1bFlXTkJQU0lzSW1Gc1p5STZJbEpUTWpVMkluMC5leUp6ZFdJaU9pSTJNREl4WmpRMVpDMDNOelF4TFRSbU0yUXRZalEwWVMwNFpqY3dNalEyT1RrMk9XWWlMQ0pqYjJkdWFYUnZPbWR5YjNWd2N5STZXeUpQZDI1bGNpSmRMQ0psYldGcGJGOTJaWEpwWm1sbFpDSTZkSEoxWlN3aWFYTnpJam9pYUhSMGNITTZYQzljTDJOdloyNXBkRzh0YVdSd0xtVjFMV05sYm5SeVlXd3RNUzVoYldGNmIyNWhkM011WTI5dFhDOWxkUzFqWlc1MGNtRnNMVEZmWW5Nd2FuQk9NMWhsSWl3aVkyOW5ibWwwYnpwMWMyVnlibUZ0WlNJNklqRXdNVEE1TWpRME5EWTVJaXdpWTNWemRHOXRPbTl6Y3pwdmNtZEpaQ0k2SWpZMk5qY3hJaXdpYjNKcFoybHVYMnAwYVNJNklqazNNVGswWVdZeExXTTJOelV0TkRRNU5TMWlNR0V5TFRjelpXUTFOemt3WXpJek9TSXNJbUYxWkNJNklqYzRkakpyYzIxaGNYRjFOamh5YW1SdGJUSnBNbTQ0YTJSdUlpd2lZM1Z6ZEc5dE9tTjFjM1J2YldWeVNXUWlPaUl4TURFd09USTBORFEyTmlJc0ltVjJaVzUwWDJsa0lqb2lNMk0yTkRWbU9HSXRORGRqT0MwMFpHWTBMV0ZoT1RjdE1UWmpOelF5TjJFeU1tUmlJaXdpZEc5clpXNWZkWE5sSWpvaWFXUWlMQ0poZFhSb1gzUnBiV1VpT2pFM01Ua3dOREkxTXprc0ltVjRjQ0k2TVRjeE9UQTBOakV6T1N3aVkzVnpkRzl0T21KemN6cGpiR2xsYm5SSlpDSTZJakVpTENKcFlYUWlPakUzTVRrd05ESTFNemtzSW1wMGFTSTZJamMxTVdJek1ERmhMVE15TW1NdE5ETTRNaTA0WkRRM0xUWmpOV000TkRrMFptSTFNQ0lzSW1WdFlXbHNJam9pY21Wa1lXaGhjMmhwYlRJd01qQkFlV0ZvYjI4dVkyOXRJbjAubUZHOFdyZnZsSG12c3VQNjJMR2dKWjBMUGh5LXFXZEJaYmpiMDE0Z2s3bGhuOC1fNFlKcXNUWEtJSm1IcjN1U1EtQmMyMFhmVlptT1QyRXBWcUxWRXIwaWg4UTBoN3Z3dzRIRzZkQnlwVmVpckF6UVNjVWhHYVFPbnozd2hNSjdCZHFVbW5XTjZSYW5iTDA4M2ZQQWJRX0o2MndKSVlUeEFQX0VwNFVPVkxzdEdzVHdDamgyb3pEbEJ0OHZIM2swLUpWcTlIWkE1OTNQZ08wWVVDMHBBSkx6WWluOU1qejIxckh0cTAxRWlaLXJQLVN2ckt5aFRQQUpmNUxZNXJNZ3FBZ21kdTMtamllX1dvZXZEcFFDc1FrY3dHR1U3a2JONjg4d1M2Q0NXWkQ1T2J3MjMzekF0ZEhtNmNWcEpEcjIxWjFuZ0JXWDRfV2stQ3VZWkVRdHJRIiwiYWNjZXNzdG9rZW4iOiJleUpyYVdRaU9pSlRkRmxWUlhsd1ZqVmhNR3hHZGs1Wk1Gd3ZiRnBRWVZGNFMzcE9Zak5vUXpkY0wwOWtVRUp5T0VwTmNtTTlJaXdpWVd4bklqb2lVbE15TlRZaWZRLmV5SnpkV0lpT2lJMk1ESXhaalExWkMwM056UXhMVFJtTTJRdFlqUTBZUzA0Wmpjd01qUTJPVGsyT1dZaUxDSmpiMmR1YVhSdk9tZHliM1Z3Y3lJNld5SlBkMjVsY2lKZExDSnBjM01pT2lKb2RIUndjenBjTDF3dlkyOW5ibWwwYnkxcFpIQXVaWFV0WTJWdWRISmhiQzB4TG1GdFlYcHZibUYzY3k1amIyMWNMMlYxTFdObGJuUnlZV3d0TVY5aWN6QnFjRTR6V0dVaUxDSmpiR2xsYm5SZmFXUWlPaUkzT0hZeWEzTnRZWEZ4ZFRZNGNtcGtiVzB5YVRKdU9HdGtiaUlzSW05eWFXZHBibDlxZEdraU9pSTVOekU1TkdGbU1TMWpOamMxTFRRME9UVXRZakJoTWkwM00yVmtOVGM1TUdNeU16a2lMQ0psZG1WdWRGOXBaQ0k2SWpOak5qUTFaamhpTFRRM1l6Z3ROR1JtTkMxaFlUazNMVEUyWXpjME1qZGhNakprWWlJc0luUnZhMlZ1WDNWelpTSTZJbUZqWTJWemN5SXNJbk5qYjNCbElqb2lZWGR6TG1OdloyNXBkRzh1YzJsbmJtbHVMblZ6WlhJdVlXUnRhVzRpTENKaGRYUm9YM1JwYldVaU9qRTNNVGt3TkRJMU16a3NJbVY0Y0NJNk1UY3hPVEEwTmpFek9Td2lhV0YwSWpveE56RTVNRFF5TlRNNUxDSnFkR2tpT2lKaVltWTBPRFZrT0Mwd1lqaGhMVFEzTTJJdE9UbGhaUzFtWVRZMU1Ua3dNV0kzTkdFaUxDSjFjMlZ5Ym1GdFpTSTZJakV3TVRBNU1qUTBORFk1SW4wLlJmWHJWS2JXdHJacElqY0Jvd1YzMXowNFJnd3ZSbXJSTDRtMFBpRHZTNkIxYjRjeHZOdXF5ajdsaF8zM0d5WGUwaWJqZERncFFHLV9qcWt3cEltdzhCT2NkaU1iOVNManNSNWt4VnVSRjUzeHAtOTZqSm1BMHB0WHoyVm9Wdi1Sdk1ucE5lTXg5QTVWSWljMnVGdFdnNkFZVktqNk9WUlc5d25jVVpRWXhsRXF3NVk4TVduUDVqWXFFZTN2Znk2czRnOWdCb040anBNNlVUVXY2V3l2S2hSRjdYc2tkX3FuNXNJZS1XbjZiQlZ0Y0ZwWm9hOWtRLTBfMFNuMXZicUN0UDBvSUhFeWJ0RFR3NVFqSElraldTbVVzNlBJT2Zwbkp3ZWlkeHFJb21zekNROU9qeVQzbUFWT0xZMDBUUWptRW1taFhVaTNfYlJlMHk1X014S3YyZyJ9');
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
            sdk.auth('eyJpZHRva2VuIjoiZXlKcmFXUWlPaUpVWlVkeWVqbExkbEJRWTNKYVdURXljRXBWUXpod2NYVjRVbnAxSzAxRU1HdENlRzh6Ukc1bFlXTkJQU0lzSW1Gc1p5STZJbEpUTWpVMkluMC5leUp6ZFdJaU9pSTJNREl4WmpRMVpDMDNOelF4TFRSbU0yUXRZalEwWVMwNFpqY3dNalEyT1RrMk9XWWlMQ0pqYjJkdWFYUnZPbWR5YjNWd2N5STZXeUpQZDI1bGNpSmRMQ0psYldGcGJGOTJaWEpwWm1sbFpDSTZkSEoxWlN3aWFYTnpJam9pYUhSMGNITTZYQzljTDJOdloyNXBkRzh0YVdSd0xtVjFMV05sYm5SeVlXd3RNUzVoYldGNmIyNWhkM011WTI5dFhDOWxkUzFqWlc1MGNtRnNMVEZmWW5Nd2FuQk9NMWhsSWl3aVkyOW5ibWwwYnpwMWMyVnlibUZ0WlNJNklqRXdNVEE1TWpRME5EWTVJaXdpWTNWemRHOXRPbTl6Y3pwdmNtZEpaQ0k2SWpZMk5qY3hJaXdpYjNKcFoybHVYMnAwYVNJNklqazNNVGswWVdZeExXTTJOelV0TkRRNU5TMWlNR0V5TFRjelpXUTFOemt3WXpJek9TSXNJbUYxWkNJNklqYzRkakpyYzIxaGNYRjFOamh5YW1SdGJUSnBNbTQ0YTJSdUlpd2lZM1Z6ZEc5dE9tTjFjM1J2YldWeVNXUWlPaUl4TURFd09USTBORFEyTmlJc0ltVjJaVzUwWDJsa0lqb2lNMk0yTkRWbU9HSXRORGRqT0MwMFpHWTBMV0ZoT1RjdE1UWmpOelF5TjJFeU1tUmlJaXdpZEc5clpXNWZkWE5sSWpvaWFXUWlMQ0poZFhSb1gzUnBiV1VpT2pFM01Ua3dOREkxTXprc0ltVjRjQ0k2TVRjeE9UQTBOakV6T1N3aVkzVnpkRzl0T21KemN6cGpiR2xsYm5SSlpDSTZJakVpTENKcFlYUWlPakUzTVRrd05ESTFNemtzSW1wMGFTSTZJamMxTVdJek1ERmhMVE15TW1NdE5ETTRNaTA0WkRRM0xUWmpOV000TkRrMFptSTFNQ0lzSW1WdFlXbHNJam9pY21Wa1lXaGhjMmhwYlRJd01qQkFlV0ZvYjI4dVkyOXRJbjAubUZHOFdyZnZsSG12c3VQNjJMR2dKWjBMUGh5LXFXZEJaYmpiMDE0Z2s3bGhuOC1fNFlKcXNUWEtJSm1IcjN1U1EtQmMyMFhmVlptT1QyRXBWcUxWRXIwaWg4UTBoN3Z3dzRIRzZkQnlwVmVpckF6UVNjVWhHYVFPbnozd2hNSjdCZHFVbW5XTjZSYW5iTDA4M2ZQQWJRX0o2MndKSVlUeEFQX0VwNFVPVkxzdEdzVHdDamgyb3pEbEJ0OHZIM2swLUpWcTlIWkE1OTNQZ08wWVVDMHBBSkx6WWluOU1qejIxckh0cTAxRWlaLXJQLVN2ckt5aFRQQUpmNUxZNXJNZ3FBZ21kdTMtamllX1dvZXZEcFFDc1FrY3dHR1U3a2JONjg4d1M2Q0NXWkQ1T2J3MjMzekF0ZEhtNmNWcEpEcjIxWjFuZ0JXWDRfV2stQ3VZWkVRdHJRIiwiYWNjZXNzdG9rZW4iOiJleUpyYVdRaU9pSlRkRmxWUlhsd1ZqVmhNR3hHZGs1Wk1Gd3ZiRnBRWVZGNFMzcE9Zak5vUXpkY0wwOWtVRUp5T0VwTmNtTTlJaXdpWVd4bklqb2lVbE15TlRZaWZRLmV5SnpkV0lpT2lJMk1ESXhaalExWkMwM056UXhMVFJtTTJRdFlqUTBZUzA0Wmpjd01qUTJPVGsyT1dZaUxDSmpiMmR1YVhSdk9tZHliM1Z3Y3lJNld5SlBkMjVsY2lKZExDSnBjM01pT2lKb2RIUndjenBjTDF3dlkyOW5ibWwwYnkxcFpIQXVaWFV0WTJWdWRISmhiQzB4TG1GdFlYcHZibUYzY3k1amIyMWNMMlYxTFdObGJuUnlZV3d0TVY5aWN6QnFjRTR6V0dVaUxDSmpiR2xsYm5SZmFXUWlPaUkzT0hZeWEzTnRZWEZ4ZFRZNGNtcGtiVzB5YVRKdU9HdGtiaUlzSW05eWFXZHBibDlxZEdraU9pSTVOekU1TkdGbU1TMWpOamMxTFRRME9UVXRZakJoTWkwM00yVmtOVGM1TUdNeU16a2lMQ0psZG1WdWRGOXBaQ0k2SWpOak5qUTFaamhpTFRRM1l6Z3ROR1JtTkMxaFlUazNMVEUyWXpjME1qZGhNakprWWlJc0luUnZhMlZ1WDNWelpTSTZJbUZqWTJWemN5SXNJbk5qYjNCbElqb2lZWGR6TG1OdloyNXBkRzh1YzJsbmJtbHVMblZ6WlhJdVlXUnRhVzRpTENKaGRYUm9YM1JwYldVaU9qRTNNVGt3TkRJMU16a3NJbVY0Y0NJNk1UY3hPVEEwTmpFek9Td2lhV0YwSWpveE56RTVNRFF5TlRNNUxDSnFkR2tpT2lKaVltWTBPRFZrT0Mwd1lqaGhMVFEzTTJJdE9UbGhaUzFtWVRZMU1Ua3dNV0kzTkdFaUxDSjFjMlZ5Ym1GdFpTSTZJakV3TVRBNU1qUTBORFk1SW4wLlJmWHJWS2JXdHJacElqY0Jvd1YzMXowNFJnd3ZSbXJSTDRtMFBpRHZTNkIxYjRjeHZOdXF5ajdsaF8zM0d5WGUwaWJqZERncFFHLV9qcWt3cEltdzhCT2NkaU1iOVNManNSNWt4VnVSRjUzeHAtOTZqSm1BMHB0WHoyVm9Wdi1Sdk1ucE5lTXg5QTVWSWljMnVGdFdnNkFZVktqNk9WUlc5d25jVVpRWXhsRXF3NVk4TVduUDVqWXFFZTN2Znk2czRnOWdCb040anBNNlVUVXY2V3l2S2hSRjdYc2tkX3FuNXNJZS1XbjZiQlZ0Y0ZwWm9hOWtRLTBfMFNuMXZicUN0UDBvSUhFeWJ0RFR3NVFqSElraldTbVVzNlBJT2Zwbkp3ZWlkeHFJb21zekNROU9qeVQzbUFWT0xZMDBUUWptRW1taFhVaTNfYlJlMHk1X014S3YyZyJ9');
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