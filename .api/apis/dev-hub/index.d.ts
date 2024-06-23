import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
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
    auth(...values: string[] | number[]): this;
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
    server(url: string, variables?: {}): void;
    /**
     * Get a List of SIMs for the current account.
     *
     * @summary Get All SIMs
     */
    getSimsUsingGET(metadata?: types.GetSimsUsingGetMetadataParam): Promise<FetchResponse<200, types.GetSimsUsingGetResponse200>>;
    /**
     * Change a list of SIMS for activate, deactivate, label, IMEI lock, etc. The actual change
     * will be done asynchronously. A positive-response only means that the SIM changes has
     * been successfully placed into the queue.
     *
     * @summary Create Multiple SIM Configuration
     */
    updateSimsUsingPOST(body: types.UpdateSimsUsingPostBodyParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get detail information (status, label, MSISDN, IMSI, ICCID, Lifetime, etc.) for a singe
     * SIM based on the ICCID.
     *
     * @summary Get Single SIM
     */
    getSimUsingGET(metadata: types.GetSimUsingGetMetadataParam): Promise<FetchResponse<200, types.GetSimUsingGetResponse200>>;
    /**
     * Modification of a SIM card to activate, deactivate, change label, change IMEI lock, etc.
     *
     * @summary Create Single SIM Configuration
     */
    updateSimUsingPUT(body: types.UpdateSimUsingPutBodyParam, metadata: types.UpdateSimUsingPutMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Query the current status of a specific SIM card.
     *
     * @summary Get SIM Status
     */
    getStatusForSimUsingGET(metadata: types.GetStatusForSimUsingGetMetadataParam): Promise<FetchResponse<200, types.GetStatusForSimUsingGetResponse200>>;
    /**
     * Trigger a SIM transfer workflow - if possible - for moving SIMs from one customer to
     * another.
     *
     * @summary Create SIM Transfer
     */
    simTransferUsingPOST(body: types.SimTransferUsingPostBodyParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Retrieve connectivity information and cell tower of a device with a given SIM. The API
     * call returns valid information when the 1NCE SIM is attached to a 2G/3G network only.
     *
     * @summary Get SIM Connectivity
     */
    getConnectivityInfoForSimUsingGET(metadata: types.GetConnectivityInfoForSimUsingGetMetadataParam): Promise<FetchResponse<200, types.GetConnectivityInfoForSimUsingGetResponse200>>;
    /**
     * Trigger a connectivity reset for a given SIM. The actual reset will be done
     * asynchronously. A positive-response only means that the connectivity-reset has been
     * successfully placed into the queue.
     *
     * @summary Create Connectivity Reset
     */
    resetConnectivityUsingPOST(metadata: types.ResetConnectivityUsingPostMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get diagnostic/event information for a SIM card.
     *
     * @summary Get SIM Events
     */
    getEventsForSimUsingGET(metadata: types.GetEventsForSimUsingGetMetadataParam): Promise<FetchResponse<200, types.GetEventsForSimUsingGetResponse200>>;
    /**
     * Query the SIM data and SMS usage over a given period of time. The output is limited to
     * the last 6 months.
     *
     * @summary Get SIM Usage
     */
    getUsageForSimUsingGET(metadata: types.GetUsageForSimUsingGetMetadataParam): Promise<FetchResponse<200, types.GetUsageForSimUsingGetResponse200>>;
    /**
     * Get the current data quota of a particular SIM.
     *
     * @summary Get SIM Data Quota
     */
    getDataQuotaForSimUsingGET(metadata: types.GetDataQuotaForSimUsingGetMetadataParam): Promise<FetchResponse<200, types.GetDataQuotaForSimUsingGetResponse200>>;
    /**
     * Get the current SMS quota of a particular SIM.
     *
     * @summary Get SIM SMS Quota
     */
    getSmsQuotaForSimUsingGET(metadata: types.GetSmsQuotaForSimUsingGetMetadataParam): Promise<FetchResponse<200, types.GetSmsQuotaForSimUsingGetResponse200>>;
    /**
     * Get a list of SMS sent and received by a specific SIM card.
     *
     * @summary Get MT/MO-SMS
     */
    getSmsForSimUsingGET(metadata: types.GetSmsForSimUsingGetMetadataParam): Promise<FetchResponse<200, types.GetSmsForSimUsingGetResponse200>>;
    /**
     * Create and send a MT-SMS towards a device with a 1NCE SIM.
     *
     * @summary Create SMS
     */
    sendSmsToSimUsingPOST(body: types.SendSmsToSimUsingPostBodyParam, metadata: types.SendSmsToSimUsingPostMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Query details about an individual SMS from a specifc SIM card.
     *
     * @summary Get SMS Details
     */
    getSmsOfSimUsingGET(metadata: types.GetSmsOfSimUsingGetMetadataParam): Promise<FetchResponse<200, types.GetSmsOfSimUsingGetResponse200>>;
    /**
     * Cancel a SMS message that is buffered to be delivered to the device with the SIM card
     * but was not yet delivered.
     *
     * @summary Delete SMS
     */
    cancelSmsForSimUsingDELETE(metadata: types.CancelSmsForSimUsingDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Top up the data/SMS volume of one specific SIM.
     *
     * @summary Create Single Top Up
     * @throws FetchError<400, types.TopUpUsingPostResponse400> Bad Request
     */
    topUpUsingPOST(metadata: types.TopUpUsingPostMetadataParam): Promise<FetchResponse<201, types.TopUpUsingPostResponse201>>;
    /**
     * Top up the data/SMS volume of a list of SIM.
     *
     * @summary Create Multiple Top Up
     * @throws FetchError<400, types.TopUpMultipleUsingPostResponse400> Bad Request
     */
    topUpMultipleUsingPOST(body: types.TopUpMultipleUsingPostBodyParam, metadata?: types.TopUpMultipleUsingPostMetadataParam): Promise<FetchResponse<201, types.TopUpMultipleUsingPostResponse201>>;
    /**
     * Trigger an auto top up configuration update for the given SIMs.
     *
     * @summary Enable Auto Top Up
     */
    autoTopupUsingPOST(body: types.AutoTopupUsingPostBodyParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get currently configured self-set monthly limits (Data, MT-SMS, MO-SMS) for all SIMs.
     *
     * @summary Get Global Limits
     */
    getLimitsUsingGET(): Promise<FetchResponse<200, types.GetLimitsUsingGetResponse200>>;
    /**
     * Configure self-set monthly limits for all SIMs (Data, MT-SMS, MO-SMS).
     *
     * @summary Create Global Limits
     */
    setLimitsUsingPOST(body: types.SetLimitsUsingPostBodyParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get a list of slectable limits for a given service.
     *
     * @summary Get SIM Limits
     */
    getSelectableLimitsUsingGET(metadata: types.GetSelectableLimitsUsingGetMetadataParam): Promise<FetchResponse<200, types.GetSelectableLimitsUsingGetResponse200>>;
    /**
     * Trigger the SIM extension for one or more SIM cards to extend their activation period
     * and renew their quota (data and SMS). An invoice is automatically triggered depending on
     * the chosen payment method.
     *
     * @summary Create SIM Extension
     */
    extendSimsUsingPOST(body: types.ExtendSimsUsingPostBodyParam, metadata?: types.ExtendSimsUsingPostMetadataParam): Promise<FetchResponse<number, unknown>>;
}
declare const createSDK: SDK;
export = createSDK;
