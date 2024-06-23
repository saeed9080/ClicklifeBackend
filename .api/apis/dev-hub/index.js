"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'dev-hub/v2.0 (api/6.1.1)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    /**
     * Get a List of SIMs for the current account.
     *
     * @summary Get All SIMs
     */
    SDK.prototype.getSimsUsingGET = function (metadata) {
        return this.core.fetch('/v1/sims', 'get', metadata);
    };
    /**
     * Change a list of SIMS for activate, deactivate, label, IMEI lock, etc. The actual change
     * will be done asynchronously. A positive-response only means that the SIM changes has
     * been successfully placed into the queue.
     *
     * @summary Create Multiple SIM Configuration
     */
    SDK.prototype.updateSimsUsingPOST = function (body) {
        return this.core.fetch('/v1/sims', 'post', body);
    };
    /**
     * Get detail information (status, label, MSISDN, IMSI, ICCID, Lifetime, etc.) for a singe
     * SIM based on the ICCID.
     *
     * @summary Get Single SIM
     */
    SDK.prototype.getSimUsingGET = function (metadata) {
        return this.core.fetch('/v1/sims/{iccid}', 'get', metadata);
    };
    /**
     * Modification of a SIM card to activate, deactivate, change label, change IMEI lock, etc.
     *
     * @summary Create Single SIM Configuration
     */
    SDK.prototype.updateSimUsingPUT = function (body, metadata) {
        return this.core.fetch('/v1/sims/{iccid}', 'put', body, metadata);
    };
    /**
     * Query the current status of a specific SIM card.
     *
     * @summary Get SIM Status
     */
    SDK.prototype.getStatusForSimUsingGET = function (metadata) {
        return this.core.fetch('/v1/sims/{iccid}/status', 'get', metadata);
    };
    /**
     * Trigger a SIM transfer workflow - if possible - for moving SIMs from one customer to
     * another.
     *
     * @summary Create SIM Transfer
     */
    SDK.prototype.simTransferUsingPOST = function (body) {
        return this.core.fetch('/v1/sims/simTransfer', 'post', body);
    };
    /**
     * Retrieve connectivity information and cell tower of a device with a given SIM. The API
     * call returns valid information when the 1NCE SIM is attached to a 2G/3G network only.
     *
     * @summary Get SIM Connectivity
     */
    SDK.prototype.getConnectivityInfoForSimUsingGET = function (metadata) {
        return this.core.fetch('/v1/sims/{iccid}/connectivity_info', 'get', metadata);
    };
    /**
     * Trigger a connectivity reset for a given SIM. The actual reset will be done
     * asynchronously. A positive-response only means that the connectivity-reset has been
     * successfully placed into the queue.
     *
     * @summary Create Connectivity Reset
     */
    SDK.prototype.resetConnectivityUsingPOST = function (metadata) {
        return this.core.fetch('/v1/sims/{iccid}/reset', 'post', metadata);
    };
    /**
     * Get diagnostic/event information for a SIM card.
     *
     * @summary Get SIM Events
     */
    SDK.prototype.getEventsForSimUsingGET = function (metadata) {
        return this.core.fetch('/v1/sims/{iccid}/events', 'get', metadata);
    };
    /**
     * Query the SIM data and SMS usage over a given period of time. The output is limited to
     * the last 6 months.
     *
     * @summary Get SIM Usage
     */
    SDK.prototype.getUsageForSimUsingGET = function (metadata) {
        return this.core.fetch('/v1/sims/{iccid}/usage', 'get', metadata);
    };
    /**
     * Get the current data quota of a particular SIM.
     *
     * @summary Get SIM Data Quota
     */
    SDK.prototype.getDataQuotaForSimUsingGET = function (metadata) {
        return this.core.fetch('/v1/sims/{iccid}/quota/data', 'get', metadata);
    };
    /**
     * Get the current SMS quota of a particular SIM.
     *
     * @summary Get SIM SMS Quota
     */
    SDK.prototype.getSmsQuotaForSimUsingGET = function (metadata) {
        return this.core.fetch('/v1/sims/{iccid}/quota/sms', 'get', metadata);
    };
    /**
     * Get a list of SMS sent and received by a specific SIM card.
     *
     * @summary Get MT/MO-SMS
     */
    SDK.prototype.getSmsForSimUsingGET = function (metadata) {
        return this.core.fetch('/v1/sims/{iccid}/sms', 'get', metadata);
    };
    /**
     * Create and send a MT-SMS towards a device with a 1NCE SIM.
     *
     * @summary Create SMS
     */
    SDK.prototype.sendSmsToSimUsingPOST = function (body, metadata) {
        return this.core.fetch('/v1/sims/{iccid}/sms', 'post', body, metadata);
    };
    /**
     * Query details about an individual SMS from a specifc SIM card.
     *
     * @summary Get SMS Details
     */
    SDK.prototype.getSmsOfSimUsingGET = function (metadata) {
        return this.core.fetch('/v1/sims/{iccid}/sms/{id}', 'get', metadata);
    };
    /**
     * Cancel a SMS message that is buffered to be delivered to the device with the SIM card
     * but was not yet delivered.
     *
     * @summary Delete SMS
     */
    SDK.prototype.cancelSmsForSimUsingDELETE = function (metadata) {
        return this.core.fetch('/v1/sims/{iccid}/sms/{id}', 'delete', metadata);
    };
    /**
     * Top up the data/SMS volume of one specific SIM.
     *
     * @summary Create Single Top Up
     * @throws FetchError<400, types.TopUpUsingPostResponse400> Bad Request
     */
    SDK.prototype.topUpUsingPOST = function (metadata) {
        return this.core.fetch('/v1/sims/{iccid}/topup', 'post', metadata);
    };
    /**
     * Top up the data/SMS volume of a list of SIM.
     *
     * @summary Create Multiple Top Up
     * @throws FetchError<400, types.TopUpMultipleUsingPostResponse400> Bad Request
     */
    SDK.prototype.topUpMultipleUsingPOST = function (body, metadata) {
        return this.core.fetch('/v1/sims/topup', 'post', body, metadata);
    };
    /**
     * Trigger an auto top up configuration update for the given SIMs.
     *
     * @summary Enable Auto Top Up
     */
    SDK.prototype.autoTopupUsingPOST = function (body) {
        return this.core.fetch('/v1/sims/autoTopup', 'post', body);
    };
    /**
     * Get currently configured self-set monthly limits (Data, MT-SMS, MO-SMS) for all SIMs.
     *
     * @summary Get Global Limits
     */
    SDK.prototype.getLimitsUsingGET = function () {
        return this.core.fetch('/v1/sims/limits', 'get');
    };
    /**
     * Configure self-set monthly limits for all SIMs (Data, MT-SMS, MO-SMS).
     *
     * @summary Create Global Limits
     */
    SDK.prototype.setLimitsUsingPOST = function (body) {
        return this.core.fetch('/v1/sims/limits', 'post', body);
    };
    /**
     * Get a list of slectable limits for a given service.
     *
     * @summary Get SIM Limits
     */
    SDK.prototype.getSelectableLimitsUsingGET = function (metadata) {
        return this.core.fetch('/v1/sims/{service}/limits', 'get', metadata);
    };
    /**
     * Trigger the SIM extension for one or more SIM cards to extend their activation period
     * and renew their quota (data and SMS). An invoice is automatically triggered depending on
     * the chosen payment method.
     *
     * @summary Create SIM Extension
     */
    SDK.prototype.extendSimsUsingPOST = function (body, metadata) {
        return this.core.fetch('/v1/sims/extension', 'post', body, metadata);
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;
