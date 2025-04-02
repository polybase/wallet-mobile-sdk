// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
export function OpaqueType() {
    return (value) => value;
}
export const HexString = OpaqueType();
export const AddressString = OpaqueType();
export const BigIntString = OpaqueType();
export function IntNumber(num) {
    return Math.floor(num);
}
//# sourceMappingURL=type.js.map