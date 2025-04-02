import { Action, Account, ConfigurationParams, Result } from "./CoinbaseWalletSDK.types";
export { Action, Account, ConfigurationParams, Result, } from "./CoinbaseWalletSDK.types";
export { WalletMobileSDKEVMProvider } from "./WalletMobileSDKEVMProvider";
export declare function configure({ callbackURL, hostURL, hostPackageName, }: ConfigurationParams): void;
export declare function initiateHandshake(initialActions?: Action[]): Promise<[Result[], Account?]>;
export declare function makeRequest(actions: Action[], account?: Account): Promise<Result[]>;
export declare function handleResponse(url: URL): boolean;
export declare function isCoinbaseWalletInstalled(): Promise<boolean>;
export declare function getCoinbaseWalletMWPVersion(): Promise<string | undefined>;
export declare function isConnected(): boolean;
export declare function resetSession(): void;
//# sourceMappingURL=CoinbaseWalletSDK.d.ts.map