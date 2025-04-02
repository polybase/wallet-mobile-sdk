import CoinbaseWalletSDK from "./CoinbaseWalletSDKModule";
export { WalletMobileSDKEVMProvider } from "./WalletMobileSDKEVMProvider";
export function configure({ callbackURL, hostURL, hostPackageName, }) {
    CoinbaseWalletSDK.configure({
        callbackURL: callbackURL.toString(),
        hostURL: hostURL?.toString(),
        hostPackageName,
    });
}
export async function initiateHandshake(initialActions) {
    const actions = initialActions?.map((action) => {
        return {
            method: action.method,
            paramsJson: JSON.stringify(action.params),
            optional: action.optional ?? false,
        };
    }) ?? [];
    return await CoinbaseWalletSDK.initiateHandshake({ initialActions: actions });
}
export async function makeRequest(actions, account) {
    const requestActions = actions.map((action) => {
        return {
            method: action.method,
            paramsJson: JSON.stringify(action.params),
            optional: action.optional ?? false,
        };
    });
    return await CoinbaseWalletSDK.makeRequest({
        actions: requestActions,
        account,
    });
}
export function handleResponse(url) {
    return CoinbaseWalletSDK.handleResponse(url.toString());
}
export async function isCoinbaseWalletInstalled() {
    return CoinbaseWalletSDK.isCoinbaseWalletInstalled();
}
export async function getCoinbaseWalletMWPVersion() {
    return CoinbaseWalletSDK.getCoinbaseWalletMWPVersion();
}
export function isConnected() {
    return CoinbaseWalletSDK.isConnected();
}
export function resetSession() {
    CoinbaseWalletSDK.resetSession();
}
//# sourceMappingURL=CoinbaseWalletSDK.js.map