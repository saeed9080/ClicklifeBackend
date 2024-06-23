declare const AutoTopupUsingPost: {
    readonly body: {
        readonly title: "Auto Top Up Request";
        readonly type: "object";
        readonly properties: {
            readonly enabled: {
                readonly type: "boolean";
                readonly description: "Boolean indicating wheather auto top up should be enabled or disabled for the given ICCIDs/SIMs.";
            };
            readonly iccids: {
                readonly type: "array";
                readonly description: "A list of ICCIDs of SIMs where the auto top up configuration should be changed.";
                readonly items: {
                    readonly type: "string";
                    readonly examples: readonly ["8988280666000000000"];
                };
            };
        };
        readonly description: "Request with a flag for enabeling and disabeling auto top up for the listed ICCIDs.";
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
};
declare const CancelSmsForSimUsingDelete: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly iccid: {
                    readonly type: "string";
                    readonly examples: readonly [8988280666000000000];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ICCID of the SIM to be queried.";
                };
                readonly id: {
                    readonly type: "number";
                    readonly examples: readonly [123];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the SMS message to be queried.";
                };
            };
            readonly required: readonly ["iccid", "id"];
        }];
    };
};
declare const ExtendSimsUsingPost: {
    readonly body: {
        readonly title: "SIM Extension Request";
        readonly type: "object";
        readonly properties: {
            readonly iccids: {
                readonly type: "array";
                readonly description: "A list of ICCIDs of SIMs which should be extended.";
                readonly items: {
                    readonly type: "string";
                    readonly examples: readonly ["8988280666000000000"];
                };
            };
            readonly productId: {
                readonly type: "integer";
                readonly description: "Optional product id (see /v1/products) for changing the product during the process of the SIM extension. If left out, the current SIM product will be used for extension.";
            };
        };
        readonly description: "Request for extending the lifetime of SIMs product.";
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly payment_method: {
                    readonly type: "string";
                    readonly enum: readonly ["banktransfer", "creditcard", "boleto"];
                    readonly default: "banktransfer";
                    readonly examples: readonly ["banktransfer"];
                    readonly description: "Optional payment method selection between creditcard, banktransfer or boleto. If the parameter is left empty or is invalid, banktransfer is used as default for the SIM extension process. To use creditcard please save your credit card details in the customer portal via \"account\".";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
};
declare const GetConnectivityInfoForSimUsingGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly iccid: {
                    readonly type: "string";
                    readonly examples: readonly [8988280666000000000];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The iccid of the SIM in question.";
                };
            };
            readonly required: readonly ["iccid"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly subscriber: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Flag indicating if the subscriber information should be retrieved. Default value is true.";
                };
                readonly ussd: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Flag for retrieving the USSD connectivity info. Default value is false.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "Connectivity Info";
            readonly type: "object";
            readonly properties: {
                readonly ussd_info: {
                    readonly title: "Ussd Information";
                    readonly type: "object";
                    readonly properties: {
                        readonly success: {
                            readonly type: "boolean";
                            readonly description: "Boolean flag indicating the success of the USSD request.";
                            readonly examples: readonly [false];
                        };
                        readonly error: {
                            readonly type: "string";
                            readonly description: "Optional information if some error occurred.";
                            readonly examples: readonly ["Request Timeout Error"];
                        };
                    };
                    readonly description: "Optional ussd information, only set if the parameter 'ussd' is set to true.";
                };
                readonly subscriber_info: {
                    readonly title: "Subscriber Information";
                    readonly type: "object";
                    readonly properties: {
                        readonly current_location_retrieved: {
                            readonly type: "boolean";
                            readonly description: "Boolean flag indicating if the retrieved location is current.";
                            readonly examples: readonly [true];
                        };
                        readonly age_of_location: {
                            readonly type: "integer";
                            readonly description: "Age of the location information in minutes.";
                            readonly examples: readonly [0];
                        };
                        readonly cell_global_id: {
                            readonly title: "Cell Global IDs";
                            readonly type: "object";
                            readonly properties: {
                                readonly cid: {
                                    readonly type: "integer";
                                };
                                readonly lac: {
                                    readonly type: "integer";
                                };
                                readonly mcc: {
                                    readonly type: "string";
                                };
                                readonly mnc: {
                                    readonly type: "string";
                                };
                            };
                            readonly description: "Mobile network parameter used to identify the cell tower of a SIM device.";
                        };
                    };
                    readonly description: "The optional subscriber info returned when the 'subscriber' parameter is true and contains information about the current SIM device location based on the mobile network.";
                };
                readonly request_timestamp: {
                    readonly type: "string";
                    readonly description: "Time in UTC the request was received.";
                    readonly examples: readonly ["2018-11-07T17:21:46.121+0000"];
                };
                readonly reply_timestamp: {
                    readonly type: "string";
                    readonly description: "Time in UTC the response was sent.";
                    readonly examples: readonly ["2018-11-07T17:21:46.263+0000"];
                };
            };
            readonly description: "Contains connectivity and cell tower information for a given SIM request.";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetDataQuotaForSimUsingGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly iccid: {
                    readonly type: "string";
                    readonly examples: readonly [8988280666000000000];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ICCID of the SIM to be queried.";
                };
            };
            readonly required: readonly ["iccid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "Quota";
            readonly type: "object";
            readonly properties: {
                readonly volume: {
                    readonly type: "number";
                    readonly description: "Remaning volume of the selected SIM. Dependent on the query, the volume is either the number of SMS reamaining or the avaliable data volume in MB.";
                    readonly examples: readonly [435.787951];
                };
                readonly total_volume: {
                    readonly type: "number";
                    readonly description: "The total data volume in MB or SMS number this SIM has available over its lifetime.";
                    readonly examples: readonly [500];
                };
                readonly expiry_date: {
                    readonly type: "string";
                    readonly description: "The date when this current quota will expire.";
                    readonly examples: readonly ["2029-01-01T00:00:00.000Z"];
                };
                readonly peak_throughput: {
                    readonly type: "integer";
                    readonly description: "The optional throughput in bit/s (only for data quotas).";
                    readonly examples: readonly [1000000];
                };
                readonly last_volume_added: {
                    readonly type: "number";
                    readonly description: "Amount of SMS or data volume which was last purchased for this SIM.";
                    readonly examples: readonly [500];
                };
                readonly last_status_change_date: {
                    readonly type: "string";
                    readonly description: "Timestamp of the last change to the quota.";
                    readonly examples: readonly ["2018-10-01T11:59:44.000Z"];
                };
                readonly threshold_percentage: {
                    readonly type: "integer";
                    readonly description: "Threshold in percentage for which a volume notification will be send.";
                    readonly examples: readonly [20];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetEventsForSimUsingGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly iccid: {
                    readonly type: "string";
                    readonly examples: readonly [8988280666000000000];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ICCID of the SIM to be queried.";
                };
            };
            readonly required: readonly ["iccid"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly minimum: 1;
                    readonly exclusiveMinimum: false;
                    readonly type: "integer";
                    readonly default: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number index of the requested SIM event page. Use this parameter to iterate through all SIMs on the different pages. The total amount of pages is listed in the response header.";
                };
                readonly pageSize: {
                    readonly maximum: 1000;
                    readonly exclusiveMaximum: false;
                    readonly minimum: 1;
                    readonly exclusiveMinimum: false;
                    readonly type: "integer";
                    readonly default: 10;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of events per page, maximum allowed value is 1000.";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly examples: readonly ["-timestamp,id"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Sort values based on keys that are listed as a comma seperated list, prepend \"-\" for descending order.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "Event Collection";
            readonly type: "object";
            readonly properties: {
                readonly events: {
                    readonly type: "array";
                    readonly items: {
                        readonly title: "SIM Event";
                        readonly type: "object";
                        readonly properties: {
                            readonly timestamp: {
                                readonly type: "string";
                                readonly description: "Timestamp of the event.";
                                readonly examples: readonly ["2018-05-07T14:08:05.000+0000"];
                            };
                            readonly event_type: {
                                readonly type: "string";
                                readonly description: "A text description of the event type.";
                                readonly examples: readonly ["Status of SIM changed from 'Issued' to 'Activated'"];
                            };
                            readonly iccid: {
                                readonly type: "string";
                                readonly description: "ICCID of the SIM that triggered the event.";
                                readonly examples: readonly ["8988280666000000000"];
                            };
                            readonly imei: {
                                readonly type: "string";
                                readonly description: "IMEI of the device that triggered the event.";
                                readonly examples: readonly ["0000000000000018"];
                            };
                            readonly imsi: {
                                readonly type: "string";
                                readonly description: "IMSI of the SIM that triggered the event.";
                                readonly examples: readonly ["901405100000018"];
                            };
                            readonly country: {
                                readonly type: "string";
                                readonly description: "Mobile operator country where the event device is currently located.";
                                readonly examples: readonly ["Germany"];
                            };
                            readonly operator: {
                                readonly type: "string";
                                readonly description: "Operator name of the network the device is currently attached to.";
                                readonly examples: readonly ["T-Mobile"];
                            };
                            readonly mcc: {
                                readonly type: "string";
                                readonly description: "Mobile Country Code (MCC) of the operator network.";
                                readonly examples: readonly ["262"];
                            };
                            readonly mnc: {
                                readonly type: "string";
                                readonly description: "Mobile Network Code (MNC) of the network the device is currently attached to.";
                                readonly examples: readonly ["01"];
                            };
                            readonly alert: {
                                readonly type: "boolean";
                                readonly description: "Boolean flag determining if this event is treated as an alert.";
                                readonly examples: readonly [false];
                            };
                            readonly event_severity: {
                                readonly type: "string";
                                readonly description: "Textual representation of the severity of the event.";
                                readonly examples: readonly ["Info"];
                            };
                        };
                        readonly description: "Information about a Event. Besides the timestamp and the event_type all other values are optional and might not be included in the actual responses.";
                    };
                };
                readonly totalEvents: {
                    readonly type: "integer";
                    readonly examples: readonly [10];
                };
                readonly totalPages: {
                    readonly type: "integer";
                    readonly examples: readonly [5];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetLimitsUsingGet: {
    readonly response: {
        readonly "200": {
            readonly title: "Self-Set Limits";
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly title: "Current Data Limit";
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly description: "Identifer for the currently configured limit.";
                            readonly examples: readonly [1];
                        };
                        readonly limit: {
                            readonly type: "string";
                            readonly description: "Value of the self-set limit.";
                            readonly examples: readonly ["16"];
                        };
                        readonly unit: {
                            readonly type: "string";
                            readonly description: "Unit of the set limit.";
                            readonly examples: readonly ["MB"];
                        };
                    };
                    readonly description: "Currently self-set gloabl data volume limit.";
                };
                readonly smsMt: {
                    readonly title: "Current SMS Limit";
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly description: "Identifer for the currently configured limit.";
                            readonly examples: readonly [1];
                        };
                        readonly limit: {
                            readonly type: "string";
                            readonly description: "Value of the self-set limit.";
                            readonly examples: readonly ["10"];
                        };
                        readonly unit: {
                            readonly type: "string";
                            readonly description: "Unit of the set limit.";
                            readonly examples: readonly ["SMS"];
                        };
                    };
                    readonly description: "Currently self-set gloabl SMS limit for the given service (MT-SMS, MO-SMS).";
                };
                readonly smsMo: {
                    readonly title: "Current SMS Limit";
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly description: "Identifer for the currently configured limit.";
                            readonly examples: readonly [1];
                        };
                        readonly limit: {
                            readonly type: "string";
                            readonly description: "Value of the self-set limit.";
                            readonly examples: readonly ["10"];
                        };
                        readonly unit: {
                            readonly type: "string";
                            readonly description: "Unit of the set limit.";
                            readonly examples: readonly ["SMS"];
                        };
                    };
                    readonly description: "Currently self-set gloabl SMS limit for the given service (MT-SMS, MO-SMS).";
                };
            };
            readonly description: "Information about the self-set limits.";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetSelectableLimitsUsingGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["data", "smsMO", "smsMT"];
                    readonly default: "data";
                    readonly description: "The service name (data, smsMO, smsMT) for which to list the avaliable limit options.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["service"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "Self-Set Limits";
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly title: "Current Data Limit";
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly description: "Identifer for the currently configured limit.";
                            readonly examples: readonly [1];
                        };
                        readonly limit: {
                            readonly type: "string";
                            readonly description: "Value of the self-set limit.";
                            readonly examples: readonly ["16"];
                        };
                        readonly unit: {
                            readonly type: "string";
                            readonly description: "Unit of the set limit.";
                            readonly examples: readonly ["MB"];
                        };
                    };
                    readonly description: "Currently self-set gloabl data volume limit.";
                };
                readonly smsMt: {
                    readonly title: "Current SMS Limit";
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly description: "Identifer for the currently configured limit.";
                            readonly examples: readonly [1];
                        };
                        readonly limit: {
                            readonly type: "string";
                            readonly description: "Value of the self-set limit.";
                            readonly examples: readonly ["10"];
                        };
                        readonly unit: {
                            readonly type: "string";
                            readonly description: "Unit of the set limit.";
                            readonly examples: readonly ["SMS"];
                        };
                    };
                    readonly description: "Currently self-set gloabl SMS limit for the given service (MT-SMS, MO-SMS).";
                };
                readonly smsMo: {
                    readonly title: "Current SMS Limit";
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly description: "Identifer for the currently configured limit.";
                            readonly examples: readonly [1];
                        };
                        readonly limit: {
                            readonly type: "string";
                            readonly description: "Value of the self-set limit.";
                            readonly examples: readonly ["10"];
                        };
                        readonly unit: {
                            readonly type: "string";
                            readonly description: "Unit of the set limit.";
                            readonly examples: readonly ["SMS"];
                        };
                    };
                    readonly description: "Currently self-set gloabl SMS limit for the given service (MT-SMS, MO-SMS).";
                };
            };
            readonly description: "Information about the self-set limits.";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetSimUsingGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly iccid: {
                    readonly type: "string";
                    readonly examples: readonly [8988280666000000000];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ICCID of the SIM to be queried.";
                };
            };
            readonly required: readonly ["iccid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "SIM Card";
            readonly type: "object";
            readonly properties: {
                readonly iccid: {
                    readonly type: "string";
                    readonly description: "ICCID identifier of the SIM.";
                    readonly examples: readonly ["8988303000123456789"];
                };
                readonly iccid_with_luhn: {
                    readonly type: "string";
                    readonly description: "ICCID identifier of the SIM with Luhn check number.";
                    readonly examples: readonly ["89883030001234567890"];
                };
                readonly imsi: {
                    readonly type: "string";
                    readonly description: "First IMSI of the SIM, used for normal 1NCE network.";
                    readonly examples: readonly ["901405100000018"];
                };
                readonly imsi_2: {
                    readonly type: "string";
                    readonly description: "Second IMSI of the SIM, used for China+ network.";
                    readonly examples: readonly ["901405100000018"];
                };
                readonly current_imsi: {
                    readonly type: "string";
                    readonly description: "Currently active IMSI, dependent on the region where the SIM is used.";
                    readonly examples: readonly ["901405100000018"];
                };
                readonly msisdn: {
                    readonly type: "string";
                    readonly description: "MSISDN of the SIM.";
                    readonly examples: readonly ["882285100000018"];
                };
                readonly imei: {
                    readonly type: "string";
                    readonly description: "IMEI of the device in which the SIM is inserted.";
                    readonly examples: readonly ["0000000000000018"];
                };
                readonly imei_lock: {
                    readonly type: "boolean";
                    readonly description: "Indicates if SIM is locked to the current device IMEI.";
                    readonly examples: readonly [true];
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "The current status of the SIM card.\n\n`Enabled` `Disabled`";
                    readonly enum: readonly ["Enabled", "Disabled"];
                    readonly examples: readonly ["Disabled"];
                };
                readonly activation_date: {
                    readonly type: "string";
                    readonly description: "The date when the SIM card was activated.";
                    readonly examples: readonly ["2018-03-09T07:59:09.000+0000"];
                };
                readonly ip_address: {
                    readonly type: "string";
                    readonly description: "The fixed IP address of the SIM card.";
                    readonly examples: readonly ["100.100.100.18"];
                };
                readonly current_quota: {
                    readonly type: "number";
                    readonly description: "The overall set data quota for the SIM in MB.";
                    readonly examples: readonly [500];
                };
                readonly quota_status: {
                    readonly title: "Quota Status";
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "number";
                            readonly description: "Numeric indicator for the threshold levels: <ul><li>0: more than 20%</li><li>1: less than 20%</li><li>2: 0% remaining</li></ul>";
                            readonly examples: readonly [0];
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "Text description of the quota status.";
                        };
                        readonly threshold_reached_date: {
                            readonly type: "string";
                            readonly description: "Date on which the threshold less than 20% of the quota avaliable was reached.";
                            readonly format: "date-time";
                        };
                        readonly quota_exceeded_date: {
                            readonly type: "string";
                            readonly description: "Date on which 100% of the avaliable quota was exceeded.";
                            readonly format: "date-time";
                        };
                    };
                    readonly description: "Indicates whether more than 20%, less than 20% or 0% of the current quota SMS or data are still available.";
                };
                readonly current_quota_SMS: {
                    readonly type: "number";
                    readonly description: "Current SMS Quota for the SIM.";
                    readonly examples: readonly [250];
                };
                readonly quota_status_SMS: {
                    readonly title: "Quota Status";
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "number";
                            readonly description: "Numeric indicator for the threshold levels: <ul><li>0: more than 20%</li><li>1: less than 20%</li><li>2: 0% remaining</li></ul>";
                            readonly examples: readonly [0];
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "Text description of the quota status.";
                        };
                        readonly threshold_reached_date: {
                            readonly type: "string";
                            readonly description: "Date on which the threshold less than 20% of the quota avaliable was reached.";
                            readonly format: "date-time";
                        };
                        readonly quota_exceeded_date: {
                            readonly type: "string";
                            readonly description: "Date on which 100% of the avaliable quota was exceeded.";
                            readonly format: "date-time";
                        };
                    };
                    readonly description: "Indicates whether more than 20%, less than 20% or 0% of the current quota SMS or data are still available.";
                };
                readonly label: {
                    readonly type: "string";
                    readonly description: "Label set by the customer in the 1NCE Portal for the SIM.";
                    readonly examples: readonly ["DX-137-B12"];
                };
            };
            readonly description: "Detailed information about a SIM card.";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetSimsUsingGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly minimum: 1;
                    readonly exclusiveMinimum: false;
                    readonly type: "integer";
                    readonly default: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number index of the requested SIM list page. Use this parameter to iterate through all SIMs on the different pages. The total amount of pages is listed in the response header.";
                };
                readonly pageSize: {
                    readonly maximum: 100;
                    readonly exclusiveMaximum: false;
                    readonly minimum: 1;
                    readonly exclusiveMinimum: false;
                    readonly type: "integer";
                    readonly default: 10;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Defines the size of a page, the number of individual SIMs listed on one page. The maximum allowed value is 100.";
                };
                readonly q: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter parameter in <i>{filter}:{value}</i> format. Expects comma separated list of filtering criteria out of the following fields: <ul><li>imei</li><li>ip_address</li></ul><p><b>Example:</b> \"ip_address:127.0.0.1,imei:4711\"</p>";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Sort values in a comma seperated list. Prepend \"-\" for descending sort. Possible values:<ul><li>imei</li><li>ip_address</li></ul><p><b>Example:</b>\"ip_address,-imei\"</p>";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly title: "SIM Card";
                readonly type: "object";
                readonly properties: {
                    readonly iccid: {
                        readonly type: "string";
                        readonly description: "ICCID identifier of the SIM.";
                        readonly examples: readonly ["8988303000123456789"];
                    };
                    readonly iccid_with_luhn: {
                        readonly type: "string";
                        readonly description: "ICCID identifier of the SIM with Luhn check number.";
                        readonly examples: readonly ["89883030001234567890"];
                    };
                    readonly imsi: {
                        readonly type: "string";
                        readonly description: "First IMSI of the SIM, used for normal 1NCE network.";
                        readonly examples: readonly ["901405100000018"];
                    };
                    readonly imsi_2: {
                        readonly type: "string";
                        readonly description: "Second IMSI of the SIM, used for China+ network.";
                        readonly examples: readonly ["901405100000018"];
                    };
                    readonly current_imsi: {
                        readonly type: "string";
                        readonly description: "Currently active IMSI, dependent on the region where the SIM is used.";
                        readonly examples: readonly ["901405100000018"];
                    };
                    readonly msisdn: {
                        readonly type: "string";
                        readonly description: "MSISDN of the SIM.";
                        readonly examples: readonly ["882285100000018"];
                    };
                    readonly imei: {
                        readonly type: "string";
                        readonly description: "IMEI of the device in which the SIM is inserted.";
                        readonly examples: readonly ["0000000000000018"];
                    };
                    readonly imei_lock: {
                        readonly type: "boolean";
                        readonly description: "Indicates if SIM is locked to the current device IMEI.";
                        readonly examples: readonly [true];
                    };
                    readonly status: {
                        readonly type: "string";
                        readonly description: "The current status of the SIM card.\n\n`Enabled` `Disabled`";
                        readonly enum: readonly ["Enabled", "Disabled"];
                        readonly examples: readonly ["Disabled"];
                    };
                    readonly activation_date: {
                        readonly type: "string";
                        readonly description: "The date when the SIM card was activated.";
                        readonly examples: readonly ["2018-03-09T07:59:09.000+0000"];
                    };
                    readonly ip_address: {
                        readonly type: "string";
                        readonly description: "The fixed IP address of the SIM card.";
                        readonly examples: readonly ["100.100.100.18"];
                    };
                    readonly current_quota: {
                        readonly type: "number";
                        readonly description: "The overall set data quota for the SIM in MB.";
                        readonly examples: readonly [500];
                    };
                    readonly quota_status: {
                        readonly title: "Quota Status";
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "number";
                                readonly description: "Numeric indicator for the threshold levels: <ul><li>0: more than 20%</li><li>1: less than 20%</li><li>2: 0% remaining</li></ul>";
                                readonly examples: readonly [0];
                            };
                            readonly description: {
                                readonly type: "string";
                                readonly description: "Text description of the quota status.";
                            };
                            readonly threshold_reached_date: {
                                readonly type: "string";
                                readonly description: "Date on which the threshold less than 20% of the quota avaliable was reached.";
                                readonly format: "date-time";
                            };
                            readonly quota_exceeded_date: {
                                readonly type: "string";
                                readonly description: "Date on which 100% of the avaliable quota was exceeded.";
                                readonly format: "date-time";
                            };
                        };
                        readonly description: "Indicates whether more than 20%, less than 20% or 0% of the current quota SMS or data are still available.";
                    };
                    readonly current_quota_SMS: {
                        readonly type: "number";
                        readonly description: "Current SMS Quota for the SIM.";
                        readonly examples: readonly [250];
                    };
                    readonly quota_status_SMS: {
                        readonly title: "Quota Status";
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "number";
                                readonly description: "Numeric indicator for the threshold levels: <ul><li>0: more than 20%</li><li>1: less than 20%</li><li>2: 0% remaining</li></ul>";
                                readonly examples: readonly [0];
                            };
                            readonly description: {
                                readonly type: "string";
                                readonly description: "Text description of the quota status.";
                            };
                            readonly threshold_reached_date: {
                                readonly type: "string";
                                readonly description: "Date on which the threshold less than 20% of the quota avaliable was reached.";
                                readonly format: "date-time";
                            };
                            readonly quota_exceeded_date: {
                                readonly type: "string";
                                readonly description: "Date on which 100% of the avaliable quota was exceeded.";
                                readonly format: "date-time";
                            };
                        };
                        readonly description: "Indicates whether more than 20%, less than 20% or 0% of the current quota SMS or data are still available.";
                    };
                    readonly label: {
                        readonly type: "string";
                        readonly description: "Label set by the customer in the 1NCE Portal for the SIM.";
                        readonly examples: readonly ["DX-137-B12"];
                    };
                };
                readonly description: "Detailed information about a SIM card.";
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetSmsForSimUsingGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly iccid: {
                    readonly type: "string";
                    readonly examples: readonly [8988280666000000000];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ICCID of the SIM to be queried.";
                };
            };
            readonly required: readonly ["iccid"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly minimum: 1;
                    readonly exclusiveMinimum: false;
                    readonly type: "integer";
                    readonly default: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number index of the requested SIM SMS page. Use this parameter to iterate through all SIMs on the different pages. The total amount of pages is listed in the response header.";
                };
                readonly pageSize: {
                    readonly maximum: 100;
                    readonly exclusiveMaximum: false;
                    readonly minimum: 1;
                    readonly exclusiveMinimum: false;
                    readonly type: "integer";
                    readonly default: 10;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of SMS messages per page, maximum allowed value is 100.";
                };
                readonly sort: {
                    readonly type: "string";
                    readonly examples: readonly ["status,ip_address"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Keys by which the SMS messages should be sorted, listed as comma sperated values.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly title: "SMS Data Object";
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "number";
                        readonly description: "ID of the SMS Data Object.";
                        readonly examples: readonly [590];
                    };
                    readonly submit_date: {
                        readonly type: "string";
                        readonly description: "The date and time on which this SMS was submitted.";
                        readonly examples: readonly ["2015-10-05T13:56:59.000Z"];
                    };
                    readonly delivery_date: {
                        readonly type: "string";
                        readonly description: "The date and time on which this SMS was delivered.";
                        readonly examples: readonly ["2015-10-05T13:56:59.000Z"];
                    };
                    readonly expiry_date: {
                        readonly type: "string";
                        readonly description: "The date and time on which this SMS will expire.";
                        readonly examples: readonly ["2015-10-06T13:56:59.000Z"];
                    };
                    readonly final_date: {
                        readonly type: "string";
                        readonly description: "The final date and time.";
                        readonly examples: readonly ["2015-10-05T13:57:03.000Z"];
                    };
                    readonly retry_date: {
                        readonly type: "string";
                        readonly description: "The date and time on which the delivery was retried.";
                        readonly examples: readonly ["2015-10-05T13:57:03.000Z"];
                    };
                    readonly last_delivery_attempt: {
                        readonly type: "string";
                        readonly description: "The date and time on which the last delivery was attempted.";
                        readonly examples: readonly ["2015-10-05T13:57:03.000Z"];
                    };
                    readonly retry_count: {
                        readonly type: "string";
                        readonly description: "The SMS delivery retry count.";
                        readonly examples: readonly ["1"];
                    };
                    readonly source_address: {
                        readonly type: "string";
                        readonly description: "The source address of the SMS message.";
                        readonly examples: readonly ["1234567890"];
                    };
                    readonly iccid: {
                        readonly type: "string";
                        readonly description: "The ICCID of the SIM involved in the SMS message.";
                        readonly examples: readonly ["8988303000000001000"];
                    };
                    readonly msisdn: {
                        readonly type: "string";
                        readonly description: "MSISDN of the SIM involved in the SMS message.";
                        readonly examples: readonly ["883XXXXXXXXXXXX"];
                    };
                    readonly imsi: {
                        readonly type: "string";
                        readonly description: "IMSI of the SIM involved in the SMS message.";
                        readonly examples: readonly ["901XXXXXXXXXXXX"];
                    };
                    readonly msc: {
                        readonly type: "string";
                        readonly description: "MSC involved in processing the SMS message.";
                        readonly examples: readonly ["491600190000"];
                    };
                    readonly dcs: {
                        readonly type: "integer";
                        readonly description: "The Data Coding Scheme (DCS) of the SMS.\n\n`4` `8`";
                        readonly format: "int32";
                        readonly enum: readonly [0, 4, 8];
                        readonly examples: readonly [0];
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly udh: {
                        readonly type: "string";
                        readonly description: "User Data Header encoded has hex-String.";
                        readonly examples: readonly ["050003CC0301"];
                    };
                    readonly payload: {
                        readonly type: "string";
                        readonly description: "The content body of the SMS message.";
                        readonly examples: readonly ["This is a SMS message."];
                    };
                    readonly status: {
                        readonly title: "SMS Status";
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "number";
                                readonly description: "Numerical status identifier for a SMS message.";
                                readonly examples: readonly [4];
                            };
                            readonly description: {
                                readonly type: "string";
                                readonly description: "Text description of the message status.";
                                readonly examples: readonly ["DELIVERED"];
                            };
                        };
                    };
                    readonly sms_type: {
                        readonly title: "Type definition for MT-SMS and MO-SMS.";
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "number";
                                readonly description: "Numerical identifier for the type of SMS message.";
                                readonly examples: readonly [1];
                            };
                            readonly description: {
                                readonly type: "string";
                                readonly description: "Type description of the SMS message.\n\n`MT` `MO`";
                                readonly enum: readonly ["MT", "MO"];
                                readonly examples: readonly ["MT"];
                            };
                        };
                    };
                    readonly source_address_type: {
                        readonly title: "Source Address Type";
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "number";
                                readonly description: "Numerical identifier for the type of source address of an SMS. <ul><li>145 - International</li><li>161 - National</li><li>208 - Alphanumeric</li></ul>\n\n`145` `161` `208`";
                                readonly enum: readonly [145, 161, 208];
                                readonly examples: readonly [145];
                            };
                        };
                    };
                };
                readonly description: "The SMS data object contains all information about a SMS message.";
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetSmsOfSimUsingGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly iccid: {
                    readonly type: "string";
                    readonly examples: readonly [8988280666000000000];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ICCID of the SIM to be queried.";
                };
                readonly id: {
                    readonly type: "number";
                    readonly examples: readonly [123];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ID of the SMS message to be queried.";
                };
            };
            readonly required: readonly ["iccid", "id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "SMS Data Object";
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly description: "ID of the SMS Data Object.";
                    readonly examples: readonly [590];
                };
                readonly submit_date: {
                    readonly type: "string";
                    readonly description: "The date and time on which this SMS was submitted.";
                    readonly examples: readonly ["2015-10-05T13:56:59.000Z"];
                };
                readonly delivery_date: {
                    readonly type: "string";
                    readonly description: "The date and time on which this SMS was delivered.";
                    readonly examples: readonly ["2015-10-05T13:56:59.000Z"];
                };
                readonly expiry_date: {
                    readonly type: "string";
                    readonly description: "The date and time on which this SMS will expire.";
                    readonly examples: readonly ["2015-10-06T13:56:59.000Z"];
                };
                readonly final_date: {
                    readonly type: "string";
                    readonly description: "The final date and time.";
                    readonly examples: readonly ["2015-10-05T13:57:03.000Z"];
                };
                readonly retry_date: {
                    readonly type: "string";
                    readonly description: "The date and time on which the delivery was retried.";
                    readonly examples: readonly ["2015-10-05T13:57:03.000Z"];
                };
                readonly last_delivery_attempt: {
                    readonly type: "string";
                    readonly description: "The date and time on which the last delivery was attempted.";
                    readonly examples: readonly ["2015-10-05T13:57:03.000Z"];
                };
                readonly retry_count: {
                    readonly type: "string";
                    readonly description: "The SMS delivery retry count.";
                    readonly examples: readonly ["1"];
                };
                readonly source_address: {
                    readonly type: "string";
                    readonly description: "The source address of the SMS message.";
                    readonly examples: readonly ["1234567890"];
                };
                readonly iccid: {
                    readonly type: "string";
                    readonly description: "The ICCID of the SIM involved in the SMS message.";
                    readonly examples: readonly ["8988303000000001000"];
                };
                readonly msisdn: {
                    readonly type: "string";
                    readonly description: "MSISDN of the SIM involved in the SMS message.";
                    readonly examples: readonly ["883XXXXXXXXXXXX"];
                };
                readonly imsi: {
                    readonly type: "string";
                    readonly description: "IMSI of the SIM involved in the SMS message.";
                    readonly examples: readonly ["901XXXXXXXXXXXX"];
                };
                readonly msc: {
                    readonly type: "string";
                    readonly description: "MSC involved in processing the SMS message.";
                    readonly examples: readonly ["491600190000"];
                };
                readonly dcs: {
                    readonly type: "integer";
                    readonly description: "The Data Coding Scheme (DCS) of the SMS.\n\n`4` `8`";
                    readonly format: "int32";
                    readonly enum: readonly [0, 4, 8];
                    readonly examples: readonly [0];
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
                readonly udh: {
                    readonly type: "string";
                    readonly description: "User Data Header encoded has hex-String.";
                    readonly examples: readonly ["050003CC0301"];
                };
                readonly payload: {
                    readonly type: "string";
                    readonly description: "The content body of the SMS message.";
                    readonly examples: readonly ["This is a SMS message."];
                };
                readonly status: {
                    readonly title: "SMS Status";
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "number";
                            readonly description: "Numerical status identifier for a SMS message.";
                            readonly examples: readonly [4];
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "Text description of the message status.";
                            readonly examples: readonly ["DELIVERED"];
                        };
                    };
                };
                readonly sms_type: {
                    readonly title: "Type definition for MT-SMS and MO-SMS.";
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "number";
                            readonly description: "Numerical identifier for the type of SMS message.";
                            readonly examples: readonly [1];
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "Type description of the SMS message.\n\n`MT` `MO`";
                            readonly enum: readonly ["MT", "MO"];
                            readonly examples: readonly ["MT"];
                        };
                    };
                };
                readonly source_address_type: {
                    readonly title: "Source Address Type";
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "number";
                            readonly description: "Numerical identifier for the type of source address of an SMS. <ul><li>145 - International</li><li>161 - National</li><li>208 - Alphanumeric</li></ul>\n\n`145` `161` `208`";
                            readonly enum: readonly [145, 161, 208];
                            readonly examples: readonly [145];
                        };
                    };
                };
            };
            readonly description: "The SMS data object contains all information about a SMS message.";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetSmsQuotaForSimUsingGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly iccid: {
                    readonly type: "string";
                    readonly examples: readonly [8988280666000000000];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ICCID of the SIM to be queried.";
                };
            };
            readonly required: readonly ["iccid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "Quota";
            readonly type: "object";
            readonly properties: {
                readonly volume: {
                    readonly type: "number";
                    readonly description: "Remaning volume of the selected SIM. Dependent on the query, the volume is either the number of SMS reamaining or the avaliable data volume in MB.";
                    readonly examples: readonly [435.787951];
                };
                readonly total_volume: {
                    readonly type: "number";
                    readonly description: "The total data volume in MB or SMS number this SIM has available over its lifetime.";
                    readonly examples: readonly [500];
                };
                readonly expiry_date: {
                    readonly type: "string";
                    readonly description: "The date when this current quota will expire.";
                    readonly examples: readonly ["2029-01-01T00:00:00.000Z"];
                };
                readonly peak_throughput: {
                    readonly type: "integer";
                    readonly description: "The optional throughput in bit/s (only for data quotas).";
                    readonly examples: readonly [1000000];
                };
                readonly last_volume_added: {
                    readonly type: "number";
                    readonly description: "Amount of SMS or data volume which was last purchased for this SIM.";
                    readonly examples: readonly [500];
                };
                readonly last_status_change_date: {
                    readonly type: "string";
                    readonly description: "Timestamp of the last change to the quota.";
                    readonly examples: readonly ["2018-10-01T11:59:44.000Z"];
                };
                readonly threshold_percentage: {
                    readonly type: "integer";
                    readonly description: "Threshold in percentage for which a volume notification will be send.";
                    readonly examples: readonly [20];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetStatusForSimUsingGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly iccid: {
                    readonly type: "string";
                    readonly examples: readonly [8988280666000000000];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ICCID of the SIM to be queried.";
                };
            };
            readonly required: readonly ["iccid"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "Connectivity";
            readonly type: "object";
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly description: "The current connectivity status of a SIM.\n\n`OFFLINE` `ONLINE` `ATTACHED`";
                    readonly enum: readonly ["OFFLINE", "ONLINE", "ATTACHED"];
                    readonly examples: readonly ["OFFLINE"];
                };
                readonly location: {
                    readonly title: "Location";
                    readonly type: "object";
                    readonly properties: {
                        readonly iccid: {
                            readonly type: "string";
                            readonly description: "ICCID of a specific 1NCE SIM.";
                            readonly examples: readonly ["8988280666000000000"];
                        };
                        readonly imsi: {
                            readonly type: "string";
                            readonly description: "IMSI of the SIM that triggered the event.";
                            readonly examples: readonly ["901405100000018"];
                        };
                        readonly last_updated: {
                            readonly type: "string";
                            readonly description: "Timestamp from the last location update.";
                            readonly format: "date-time";
                        };
                        readonly last_updated_gprs: {
                            readonly type: "string";
                            readonly description: "Timestamp from the last GPRS location update.";
                            readonly format: "date-time";
                        };
                        readonly sgsn_number: {
                            readonly type: "string";
                            readonly description: "Serving GPRS Support Node (SGSN) identifier for the SGSN where the SIM is attached.";
                            readonly examples: readonly ["491600300000"];
                        };
                        readonly vlr_number: {
                            readonly type: "string";
                            readonly description: "Visitor Location Register (VLR) identifier.";
                            readonly examples: readonly ["491710000000"];
                        };
                        readonly vlr_number_np: {
                            readonly type: "string";
                            readonly description: "Visitor Location Register (VLR) Number NP.";
                            readonly examples: readonly ["1"];
                        };
                        readonly msc_number_np: {
                            readonly type: "string";
                            readonly description: "Mobile-services Switching Centre (MSC) Number NP.";
                            readonly examples: readonly ["1"];
                        };
                        readonly sgsn_number_np: {
                            readonly type: "string";
                            readonly description: "Serving GPRS Support Node (SGSN) Number NP.";
                            readonly examples: readonly ["1"];
                        };
                        readonly operator_id: {
                            readonly type: "string";
                            readonly description: "Identifier for the current operator the SIM is connected to.";
                            readonly examples: readonly ["2"];
                        };
                        readonly msc: {
                            readonly type: "string";
                            readonly description: "Mobile-services Switching Centre (MSC) identifier number.";
                            readonly examples: readonly ["491710300000"];
                        };
                        readonly sgsn_ip_address: {
                            readonly type: "string";
                            readonly description: "IP address of the used Serving GPRS Support Node (SGSN).";
                            readonly examples: readonly ["x.x.x.x"];
                        };
                        readonly operator: {
                            readonly title: "Operator";
                            readonly type: "object";
                            readonly properties: {
                                readonly id: {
                                    readonly type: "string";
                                    readonly description: "Identifier for the operator.";
                                    readonly examples: readonly ["2"];
                                };
                                readonly name: {
                                    readonly type: "string";
                                    readonly description: "String name of the operator where the SIM is currently attached to.";
                                    readonly examples: readonly ["T-Mobile"];
                                };
                                readonly country: {
                                    readonly title: "Country";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                            readonly description: "Identifier of the country.";
                                            readonly examples: readonly ["74"];
                                        };
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "String name of the country of the operator where the SIM is currently attached.";
                                            readonly examples: readonly ["Germany"];
                                        };
                                        readonly "iso-code": {
                                            readonly type: "string";
                                            readonly description: "ISO code for the country.";
                                            readonly examples: readonly ["de"];
                                        };
                                    };
                                    readonly description: "Information about the country of the mobile operator.";
                                };
                            };
                            readonly description: "Information about the operator.";
                        };
                        readonly country: {
                            readonly title: "Country";
                            readonly type: "object";
                            readonly properties: {
                                readonly country_id: {
                                    readonly type: "string";
                                    readonly description: "Identifier of the country.";
                                    readonly examples: readonly ["74"];
                                };
                                readonly name: {
                                    readonly type: "string";
                                    readonly description: "String name of the country where the SIM device is currently located.";
                                    readonly examples: readonly ["Germany"];
                                };
                                readonly country_code: {
                                    readonly type: "string";
                                    readonly description: "International country code.";
                                    readonly examples: readonly ["49"];
                                };
                                readonly mcc: {
                                    readonly type: "string";
                                    readonly description: "Mobile Country Code (MCC) of the SIM device location country.";
                                    readonly examples: readonly ["262"];
                                };
                                readonly "iso-code": {
                                    readonly type: "string";
                                    readonly description: "ISO code for the country.";
                                    readonly examples: readonly ["de"];
                                };
                                readonly latitude: {
                                    readonly type: "string";
                                    readonly description: "Reference latitude of the location country.";
                                    readonly examples: readonly ["51"];
                                };
                                readonly longitude: {
                                    readonly type: "string";
                                    readonly description: "Reference longitude of the location country.";
                                    readonly examples: readonly ["9"];
                                };
                            };
                            readonly description: "Information about the location country.";
                        };
                    };
                    readonly description: "Location information of the SIM device.";
                };
                readonly pdp_context: {
                    readonly title: "PDP Context";
                    readonly type: "object";
                    readonly properties: {
                        readonly pdp_context_id: {
                            readonly type: "string";
                            readonly description: "ID of the current PDP Context.";
                            readonly examples: readonly ["1898708000"];
                        };
                        readonly endpoint_id: {
                            readonly type: "string";
                            readonly description: "ID of the used SIM endpoint.";
                            readonly examples: readonly ["10458000"];
                        };
                        readonly tariff_profile_id: {
                            readonly type: "string";
                            readonly description: "ID of the used tariff profile.";
                            readonly examples: readonly ["129700"];
                        };
                        readonly tariff_id: {
                            readonly type: "string";
                            readonly description: "ID of the used tariff.";
                            readonly examples: readonly ["442"];
                        };
                        readonly ratezone_id: {
                            readonly type: "string";
                            readonly description: "ID of the used ratezone.";
                            readonly examples: readonly ["2171"];
                        };
                        readonly organisation_id: {
                            readonly type: "string";
                            readonly description: "ID of the internal organisation reference.";
                            readonly examples: readonly ["26xxx"];
                        };
                        readonly imsi_id: {
                            readonly type: "string";
                            readonly description: "ID of the used IMSI.";
                            readonly examples: readonly ["1610xxx"];
                        };
                        readonly imsi: {
                            readonly type: "string";
                            readonly description: "IMSI of the specific SIM.";
                            readonly examples: readonly ["901405100000018"];
                        };
                        readonly sim_id: {
                            readonly type: "string";
                            readonly description: "ID of the specific SIM.";
                            readonly examples: readonly ["901xxx"];
                        };
                        readonly teid_data_plane: {
                            readonly type: "string";
                            readonly description: "Tunnel ID for the current PDP Context user plane.";
                            readonly examples: readonly ["153329900"];
                        };
                        readonly teid_control_plane: {
                            readonly type: "string";
                            readonly description: "Tunnel ID for the current PDP Context control plane.";
                            readonly examples: readonly ["153329900"];
                        };
                        readonly gtp_version: {
                            readonly type: "string";
                            readonly description: "Version of the used GPRS Tunneling Protocol (GTP).";
                            readonly examples: readonly ["1"];
                        };
                        readonly nsapi: {
                            readonly type: "string";
                            readonly description: "ID of the used Network Service Access Point Identifier (NSAPI).";
                            readonly examples: readonly ["5"];
                        };
                        readonly sgsn_control_plane_ip_address: {
                            readonly type: "string";
                            readonly description: "IP address of the Serving GPRS Support Node (SGSN) for the control plane.";
                            readonly examples: readonly ["x.x.x.x"];
                        };
                        readonly sgsn_data_plane_ip_address: {
                            readonly type: "string";
                            readonly description: "IP address of the Serving GPRS Support Node (SGSN) for the user data plane.";
                            readonly examples: readonly ["x.x.x.x"];
                        };
                        readonly ggsn_control_plane_ip_address: {
                            readonly type: "string";
                            readonly description: "IP address of the Gateway GPRS Support Node (GGSN) for the control plane.";
                            readonly examples: readonly ["x.x.x.x"];
                        };
                        readonly ggsn_data_plane_ip_address: {
                            readonly type: "string";
                            readonly description: "IP address of the Gateway GPRS Support Node (GGSN) for the user data plane.";
                            readonly examples: readonly ["x.x.x.x"];
                        };
                        readonly created: {
                            readonly type: "string";
                            readonly description: "Timestamp when the PDP Context was created.";
                            readonly format: "date-time";
                        };
                        readonly mcc: {
                            readonly type: "string";
                            readonly description: "Mobile Country Code (MCC).";
                            readonly examples: readonly ["262"];
                        };
                        readonly mnc: {
                            readonly type: "string";
                            readonly description: "Mobile Network Code (MNC).";
                            readonly examples: readonly ["1"];
                        };
                        readonly operator_id: {
                            readonly type: "string";
                            readonly description: "ID of the used SIM endpoint.";
                            readonly examples: readonly ["38701"];
                        };
                        readonly lac: {
                            readonly type: "string";
                            readonly description: "Location paramter of the PDP Context.";
                            readonly examples: readonly ["10458000"];
                        };
                        readonly ci: {
                            readonly type: "string";
                            readonly description: "Cell Identity (CI).";
                            readonly examples: readonly ["5559"];
                        };
                        readonly ue_ip_address: {
                            readonly type: "string";
                            readonly description: "IP address of the device using the SIM.";
                            readonly examples: readonly ["x.x.x.x"];
                        };
                        readonly imeisv: {
                            readonly type: "string";
                            readonly description: "IMEISV of the device with the SIM.";
                            readonly examples: readonly ["8635760478500000"];
                        };
                        readonly duration: {
                            readonly type: "string";
                            readonly description: "Current duration of the PDP Context.";
                            readonly examples: readonly ["02:39:10"];
                        };
                        readonly rat_type: {
                            readonly title: "Radio Access Technolog (RAT) Type";
                            readonly type: "object";
                            readonly properties: {
                                readonly rat_type_id: {
                                    readonly type: "string";
                                    readonly description: "ID of the used RAT.";
                                    readonly examples: readonly ["2"];
                                };
                                readonly description: {
                                    readonly type: "string";
                                    readonly description: "String description of the used RAT.\n\n`2G` `3G` `4G` `5G` `NB-IoT`";
                                    readonly enum: readonly ["2G", "3G", "4G", "5G", "NB-IoT"];
                                    readonly examples: readonly ["2G"];
                                };
                            };
                            readonly description: "Describes the Radio Access Technology used in the PDP Context.";
                        };
                    };
                    readonly description: "Information about the current PDP Context of the SIM.";
                };
                readonly services: {
                    readonly type: "array";
                    readonly description: "List of services currently avaliable.";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Currently used service.";
                        readonly examples: readonly ["GPRS"];
                    };
                };
            };
            readonly description: "Information about the current SIM connectivity status, location and PDP Context of a SIM.";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetUsageForSimUsingGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly iccid: {
                    readonly type: "string";
                    readonly examples: readonly [8988280666000000000];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ICCID of the SIM to be queried.";
                };
            };
            readonly required: readonly ["iccid"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly start_dt: {
                    readonly type: "string";
                    readonly examples: readonly ["2022-07-22"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Start date used for the query, format: YYYY-MM-DD";
                };
                readonly end_dt: {
                    readonly type: "string";
                    readonly examples: readonly ["2022-07-22"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "End date used for the usage query, format: YYYY-MM-DD";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "Usage Record";
            readonly type: "object";
            readonly properties: {
                readonly stats: {
                    readonly type: "array";
                    readonly description: "List of queried usage statistics for the given SIM.";
                    readonly items: {
                        readonly title: "Daily Usage Record";
                        readonly type: "object";
                        readonly properties: {
                            readonly data: {
                                readonly title: "Data Usage Record";
                                readonly type: "object";
                                readonly properties: {
                                    readonly cost: {
                                        readonly type: "string";
                                        readonly description: "The cost shown here match 1:1 the used SMS. There is no real cost value behind this number.";
                                        readonly examples: readonly ["0.002803"];
                                    };
                                    readonly currency: {
                                        readonly title: "Currency";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly id: {
                                                readonly type: "integer";
                                                readonly description: "Id of the currency.";
                                                readonly examples: readonly [1];
                                            };
                                            readonly symbol: {
                                                readonly type: "string";
                                                readonly description: "ASCII symbol of the currency.";
                                                readonly examples: readonly ["€"];
                                            };
                                            readonly code: {
                                                readonly type: "string";
                                                readonly description: "Standardized currency code.";
                                                readonly examples: readonly ["EUR"];
                                            };
                                        };
                                        readonly description: "Description of the currency.";
                                    };
                                    readonly traffic_type: {
                                        readonly title: "Traffic Type Data";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly description: {
                                                readonly type: "string";
                                                readonly description: "Defines the type of traffic listed.";
                                                readonly examples: readonly ["Data"];
                                            };
                                            readonly id: {
                                                readonly type: "integer";
                                                readonly description: "ID of the traffic type.";
                                                readonly examples: readonly [1];
                                            };
                                            readonly unit: {
                                                readonly type: "string";
                                                readonly description: "Lists the unit used for the traffic type.";
                                                readonly examples: readonly ["MB"];
                                            };
                                        };
                                        readonly description: "Details about the data traffic type.";
                                    };
                                    readonly volume: {
                                        readonly type: "string";
                                        readonly description: "The summed RX and TX data volume in MB.";
                                        readonly examples: readonly ["0.002803"];
                                    };
                                    readonly volume_rx: {
                                        readonly type: "string";
                                        readonly description: "The used RX (downstream, received by SIM) data volume in MB.";
                                        readonly examples: readonly ["0.001482"];
                                    };
                                    readonly volume_tx: {
                                        readonly type: "string";
                                        readonly description: "The used TX (upstream, send by SIM) data volume in MB.";
                                        readonly examples: readonly ["0.001321"];
                                    };
                                };
                                readonly description: "A usage record for the data used by a SIM.";
                            };
                            readonly date: {
                                readonly type: "string";
                                readonly description: "Date of the shown usage record.";
                                readonly examples: readonly ["2021-06-30T00:00:00.000Z"];
                            };
                            readonly sms: {
                                readonly title: "SMS Usage Record";
                                readonly type: "object";
                                readonly properties: {
                                    readonly cost: {
                                        readonly type: "string";
                                        readonly description: "The cost shown here match 1:1 the used SMS. There is no real cost value behind this number.";
                                        readonly examples: readonly ["4"];
                                    };
                                    readonly currency: {
                                        readonly title: "Currency";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly id: {
                                                readonly type: "integer";
                                                readonly description: "Id of the currency.";
                                                readonly examples: readonly [1];
                                            };
                                            readonly symbol: {
                                                readonly type: "string";
                                                readonly description: "ASCII symbol of the currency.";
                                                readonly examples: readonly ["€"];
                                            };
                                            readonly code: {
                                                readonly type: "string";
                                                readonly description: "Standardized currency code.";
                                                readonly examples: readonly ["EUR"];
                                            };
                                        };
                                        readonly description: "Description of the currency.";
                                    };
                                    readonly traffic_type: {
                                        readonly title: "Traffic Type SMS";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly description: {
                                                readonly type: "string";
                                                readonly description: "Defines the type of traffic listed.";
                                                readonly examples: readonly ["SMS"];
                                            };
                                            readonly id: {
                                                readonly type: "integer";
                                                readonly description: "ID of the traffic type.";
                                                readonly examples: readonly [1];
                                            };
                                            readonly unit: {
                                                readonly type: "string";
                                                readonly description: "Lists the unit used for the traffic type.";
                                                readonly examples: readonly ["SMS"];
                                            };
                                        };
                                        readonly description: "Details about the SMS traffic type.";
                                    };
                                    readonly volume: {
                                        readonly type: "string";
                                        readonly description: "The summed MO- and MT-SMS messages count.";
                                        readonly examples: readonly ["3"];
                                    };
                                    readonly volume_rx: {
                                        readonly type: "string";
                                        readonly description: "The used MO-SMS message count.";
                                        readonly examples: readonly ["2"];
                                    };
                                    readonly volume_tx: {
                                        readonly type: "string";
                                        readonly description: "The used MT-SMS message count.";
                                        readonly examples: readonly ["1"];
                                    };
                                };
                                readonly description: "A usage record for the SMS used by a SIM.";
                            };
                        };
                        readonly description: "A daily usage record with summarized data about the SMS and data usage.";
                    };
                };
            };
            readonly description: "Information about SIM data and SMS usage.";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ResetConnectivityUsingPost: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly iccid: {
                    readonly type: "string";
                    readonly examples: readonly [8988280666000000000];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ICCID of the SIM to be reset.";
                };
            };
            readonly required: readonly ["iccid"];
        }];
    };
};
declare const SendSmsToSimUsingPost: {
    readonly body: {
        readonly title: "SMS Message Object";
        readonly type: "object";
        readonly properties: {
            readonly source_address: {
                readonly type: "string";
                readonly description: "The source address of the SMS. This value can be set to any number as it is not used by the 1NCE network.";
                readonly examples: readonly ["1234567890"];
            };
            readonly payload: {
                readonly type: "string";
                readonly description: "The content body of the SMS message.";
                readonly examples: readonly ["This is a SMS message."];
            };
            readonly udh: {
                readonly type: "string";
                readonly description: "The optinal User Data Header (UDH) encoded has hex-String can be used to concatenate SMS messages.";
                readonly examples: readonly ["050003CC0301"];
            };
            readonly dcs: {
                readonly type: "integer";
                readonly description: "The optional Data Coding Scheme (DCS) can be used for setting the message body format to HEX String or normal Text Mode.";
                readonly examples: readonly [0];
            };
            readonly source_address_type: {
                readonly title: "Source Address Type";
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "number";
                        readonly description: "Numerical identifier for the type of source address of an SMS. <ul><li>145 - International</li><li>161 - National</li><li>208 - Alphanumeric</li></ul>";
                        readonly enum: readonly [145, 161, 208];
                        readonly examples: readonly [145];
                    };
                };
            };
            readonly expiry_date: {
                readonly type: "string";
                readonly description: "Expiry Date of the sent SMS in ISO8601 format.";
                readonly examples: readonly ["2018-03-14T16:10:29.000+0000"];
            };
        };
        readonly description: "SMS message object used to describe a SMS message.";
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly iccid: {
                    readonly type: "string";
                    readonly examples: readonly [8988280666000000000];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ICCID of the SIM targeted for the MT-SMS.";
                };
            };
            readonly required: readonly ["iccid"];
        }];
    };
};
declare const SetLimitsUsingPost: {
    readonly body: {
        readonly title: "Set Limits Request";
        readonly type: "object";
        readonly properties: {
            readonly dataLimitId: {
                readonly type: "integer";
                readonly description: "Data Limit ID (from /sims/data/limits list) to be set for the self-set data limit.";
            };
            readonly smsMtLimitId: {
                readonly type: "integer";
                readonly description: "SMS MT Limit ID (from /sims/smsMT/limits list) to be set for self-set MT-SMS limit.";
            };
            readonly smsMoLimitId: {
                readonly type: "integer";
                readonly description: "SMS MO Limit ID (from /sims/smsMO/limits list) to be set for self-set MO-SMS limit.";
            };
        };
        readonly description: "Configure the self-set limits (data, MT-SMS, MO-SMS) of all SIMs. Use /sims/{service}/limits to get a list of IDs for setting the limits.";
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
};
declare const SimTransferUsingPost: {
    readonly body: {
        readonly title: "Sim Transfer Request";
        readonly type: "object";
        readonly properties: {
            readonly target_organisation: {
                readonly type: "integer";
                readonly description: "The organisation id to transfer the SIMs TO. Required if transferring to a suborganisation.";
                readonly examples: readonly [2000000001];
            };
            readonly iccid_ranges: {
                readonly type: "array";
                readonly description: "ICCID range of SIMs included or affected by this transfer.";
                readonly items: {
                    readonly title: "Iccid Range";
                    readonly type: "object";
                    readonly properties: {
                        readonly from: {
                            readonly type: "string";
                            readonly description: "The first ICCID of the given range of SIMs.";
                            readonly examples: readonly ["8988280666000000000"];
                        };
                        readonly to: {
                            readonly type: "string";
                            readonly description: "The last ICCID of the range of the given SIMs.";
                            readonly examples: readonly ["8988280666000000010"];
                        };
                    };
                };
            };
            readonly iccids: {
                readonly type: "array";
                readonly description: "Individual ICCIDs of SIMs included or affected by this transfer.";
                readonly items: {
                    readonly type: "string";
                    readonly description: "List of ICCIDs of individual SIMs.";
                    readonly examples: readonly ["8988280666000000000"];
                };
            };
        };
        readonly description: "Request data for transferring SIMs from one customer account to another.";
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
};
declare const TopUpMultipleUsingPost: {
    readonly body: {
        readonly type: "array";
        readonly items: {
            readonly type: "string";
            readonly examples: readonly ["8988280666000000000"];
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly payment_method: {
                    readonly type: "string";
                    readonly enum: readonly ["banktransfer", "creditcard", "monthlyinvoice", "boleto"];
                    readonly default: "banktransfer";
                    readonly examples: readonly ["banktransfer"];
                    readonly description: "Optional payment method selection between creditcard, banktransfer, monthlyinvoice or boleto. If the parameter is left empty or is invalid, banktransfer is used as default for the top up order process.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly Location: {
                    readonly type: "string";
                    readonly examples: readonly ["https://api.1nce.com/management-api/v1/orders/1234"];
                    readonly description: "The path to the newly created order.";
                };
            };
        };
        readonly "400": {
            readonly title: "Invalid Payment Method";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["Payment method used is not valid."];
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const TopUpUsingPost: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly iccid: {
                    readonly type: "string";
                    readonly examples: readonly [8988280666000000000];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ICCID of the SIM to be topped up.";
                };
            };
            readonly required: readonly ["iccid"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly payment_method: {
                    readonly type: "string";
                    readonly enum: readonly ["banktransfer", "creditcard", "monthlyinvoice", "boleto"];
                    readonly default: "banktransfer";
                    readonly examples: readonly ["banktransfer"];
                    readonly description: "Optional payment method selection between creditcard, banktransfer, monthlyinvoice or boleto. If the parameter is left empty or is invalid, banktransfer is used as default for the top up order process.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly Location: {
                    readonly type: "string";
                    readonly examples: readonly ["https://api.1nce.com/management-api/v1/orders/1234"];
                    readonly description: "The path to the newly created order.";
                };
            };
        };
        readonly "400": {
            readonly title: "Invalid Payment Method";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["Payment method used is not valid."];
                };
            };
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const UpdateSimUsingPut: {
    readonly body: {
        readonly title: "SIM Update Values";
        readonly type: "object";
        readonly required: readonly ["iccid", "status"];
        readonly properties: {
            readonly iccid: {
                readonly type: "string";
                readonly description: "ICCID of the queried SIM.";
                readonly examples: readonly ["8988280666000000000"];
            };
            readonly label: {
                readonly type: "string";
                readonly description: "Label of the SIM set by the customer in the 1NCE Portal.";
                readonly examples: readonly ["DX-137-B12"];
            };
            readonly imei_lock: {
                readonly type: "boolean";
                readonly description: "Flag that indicates if SIM is locked to the current device IMEI.";
                readonly default: false;
                readonly examples: readonly [false];
            };
            readonly status: {
                readonly type: "string";
                readonly description: "Status of the SIM. A SIM can be enabled (active) or disabled (deactivated).\n\nDefault: `Enabled`";
                readonly default: "Enabled";
                readonly enum: readonly ["Enabled", "Disabled"];
                readonly examples: readonly ["Enabled"];
            };
        };
        readonly description: "Information about a SIM card based on a SIM update procedure.";
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly iccid: {
                    readonly type: "string";
                    readonly examples: readonly [8988280666000000000];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The ICCID of the SIM to be changed.";
                };
            };
            readonly required: readonly ["iccid"];
        }];
    };
};
declare const UpdateSimsUsingPost: {
    readonly body: {
        readonly type: "array";
        readonly items: {
            readonly title: "SIM Update Values";
            readonly type: "object";
            readonly required: readonly ["iccid", "status"];
            readonly properties: {
                readonly iccid: {
                    readonly type: "string";
                    readonly description: "ICCID of the queried SIM.";
                    readonly examples: readonly ["8988280666000000000"];
                };
                readonly label: {
                    readonly type: "string";
                    readonly description: "Label of the SIM set by the customer in the 1NCE Portal.";
                    readonly examples: readonly ["DX-137-B12"];
                };
                readonly imei_lock: {
                    readonly type: "boolean";
                    readonly description: "Flag that indicates if SIM is locked to the current device IMEI.";
                    readonly default: false;
                    readonly examples: readonly [false];
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Status of the SIM. A SIM can be enabled (active) or disabled (deactivated).\n\nDefault: `Enabled`";
                    readonly default: "Enabled";
                    readonly enum: readonly ["Enabled", "Disabled"];
                    readonly examples: readonly ["Enabled"];
                };
            };
            readonly description: "Information about a SIM card based on a SIM update procedure.";
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
};
export { AutoTopupUsingPost, CancelSmsForSimUsingDelete, ExtendSimsUsingPost, GetConnectivityInfoForSimUsingGet, GetDataQuotaForSimUsingGet, GetEventsForSimUsingGet, GetLimitsUsingGet, GetSelectableLimitsUsingGet, GetSimUsingGet, GetSimsUsingGet, GetSmsForSimUsingGet, GetSmsOfSimUsingGet, GetSmsQuotaForSimUsingGet, GetStatusForSimUsingGet, GetUsageForSimUsingGet, ResetConnectivityUsingPost, SendSmsToSimUsingPost, SetLimitsUsingPost, SimTransferUsingPost, TopUpMultipleUsingPost, TopUpUsingPost, UpdateSimUsingPut, UpdateSimsUsingPost };
