type SerializableValue = boolean | number | string | null | SerializableArray | SerializableObject;
type SerializableArray = Array<SerializableValue>;
interface SerializableObject {
    [key: string | number]: SerializableValue;
}

export interface SingularLinkParams {
    deeplink: string;
    passthrough: string;
    isDeferred: boolean;
}

export class SingularConfig {
    constructor(apikey: string, secret: string);

    withSessionTimeoutInSec(sessionTimeout: number): SingularConfig;
    withCustomUserId(customUserId: number): SingularConfig;
    withSingularLink(handler: (params: SingularLinkParams) => void): SingularConfig;

    withSkAdNetworkEnabled(enabled: boolean): SingularConfig;
    withManualSkanConversionManagement(): SingularConfig;
    withConversionValueUpdatedHandler(handler: (value: number) => void): SingularConfig;
    withWaitForTrackingAuthorizationWithTimeoutInterval(interval: number): SingularConfig;

    withLimitDataSharing(shouldLimitDataSharing: boolean): SingularConfig;
}

export class SingularPurchase {
    constructor(revenue: string, currency: string);

    getPurchaseValues(): SerializableObject;
}

export class SingularIOSPurchase extends SingularPurchase {
    constructor(revenue: string, currency: string, productId: string, transactionId: string, receipt: string);
}

export class SingularAndroidPurchase extends SingularPurchase {
    constructor(revenue: string, currency: string, receipt: string, signature: string);
}

export class Singular {
    static init(config: SingularConfig): void;

    static setCustomUserId(customUserId: string): void;
    static unsetCustomUserId(): void;
    static setDeviceCustomUserId(customUserId: string): void;

    static event(eventName: string): void;
    static eventWithArgs(eventName: string, args: SerializableObject): void;

    static revenue(currency: string, amount: number): void;
    static revenueWithArgs(currency: string, amount: number, args: SerializableObject): void;
    static customRevenue(eventName: string, currency: string, amount: number): void;
    static customRevenueWithArgs(eventName: string, currency: string, amount: number, args: SerializableObject): void;

    static inAppPurchase(eventName: string, purchase: SingularPurchase): void;
    static inAppPurchaseWithArgs(eventName: string, purchase: SingularPurchase, args: SerializableObject): void;

    static setUninstallToken(token: string): void;

    static trackingOptIn(): void;
    static trackingUnder13(): void;
    static stopAllTracking(): void;
    static resumeAllTracking(): void;
    static isAllTrackingStopped(): boolean;

    static limitDataSharing(shoudlLimitDataSharing: boolean): void;
    static getLimitDataSharing(): boolean;

    static skanUpdateConversionValue(conversionValue: number): boolean;
    static skanGetConversionValue(): number | null;
    static skanRegisterAppForAdNetworkAttribution(): void;
}