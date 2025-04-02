// Copyright (c) 2018-2023 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
import BN from 'bn.js';
import { AddressString, BigIntString, HexString, IntNumber } from './type';
const INT_STRING_REGEX = /^[0-9]*$/;
const HEXADECIMAL_STRING_REGEX = /^[a-f0-9]*$/;
export function hexStringToUint8Array(hexString) {
    return new Uint8Array(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
}
export function hexStringFromBuffer(buf, includePrefix = false) {
    const hex = buf.toString('hex');
    return HexString(includePrefix ? `0x${hex}` : hex);
}
export function bigIntStringFromBN(bn) {
    return BigIntString(bn.toString(10));
}
export function intNumberFromHexString(hex) {
    return IntNumber(new BN(ensureEvenLengthHexString(hex, false), 16).toNumber());
}
export function hexStringFromIntNumber(num) {
    return HexString(`0x${new BN(num).toString(16)}`);
}
export function has0xPrefix(str) {
    return str.startsWith('0x') || str.startsWith('0X');
}
export function strip0x(hex) {
    if (has0xPrefix(hex)) {
        return hex.slice(2);
    }
    return hex;
}
export function prepend0x(hex) {
    if (has0xPrefix(hex)) {
        return `0x${hex.slice(2)}`;
    }
    return `0x${hex}`;
}
export function isHexString(hex) {
    if (typeof hex !== 'string') {
        return false;
    }
    const s = strip0x(hex).toLowerCase();
    return HEXADECIMAL_STRING_REGEX.test(s);
}
class InvalidParamsError extends Error {
    code = -32602;
    constructor(message) {
        super(message);
    }
}
export function ensureHexString(hex, includePrefix = false) {
    if (typeof hex === 'string') {
        const s = strip0x(hex).toLowerCase();
        if (HEXADECIMAL_STRING_REGEX.test(s)) {
            return HexString(includePrefix ? `0x${s}` : s);
        }
    }
    throw new InvalidParamsError(`"${String(hex)}" is not a hexadecimal string`);
}
export function ensureEvenLengthHexString(hex, includePrefix = false) {
    let h = ensureHexString(hex, false);
    if (h.length % 2 === 1) {
        h = HexString(`0${h}`);
    }
    return includePrefix ? HexString(`0x${h}`) : h;
}
export function ensureAddressString(str) {
    if (typeof str === 'string') {
        const s = strip0x(str).toLowerCase();
        if (isHexString(s) && s.length === 40) {
            return AddressString(prepend0x(s));
        }
    }
    throw new InvalidParamsError(`Invalid Ethereum address: ${String(str)}`);
}
export function ensureBuffer(str) {
    if (Buffer.isBuffer(str)) {
        return str;
    }
    if (typeof str === 'string') {
        if (isHexString(str)) {
            const s = ensureEvenLengthHexString(str, false);
            return Buffer.from(s, 'hex');
        }
        return Buffer.from(str, 'utf8');
    }
    throw new InvalidParamsError(`Not binary data: ${String(str)}`);
}
export function ensureIntNumber(num) {
    if (typeof num === 'number' && Number.isInteger(num)) {
        return IntNumber(num);
    }
    if (typeof num === 'string') {
        if (INT_STRING_REGEX.test(num)) {
            return IntNumber(Number(num));
        }
        if (isHexString(num)) {
            return IntNumber(new BN(ensureEvenLengthHexString(num, false), 16).toNumber());
        }
    }
    throw new InvalidParamsError(`Not an integer: ${String(num)}`);
}
export function ensureBN(val) {
    if (val !== null && (BN.isBN(val) || isBigNumber(val))) {
        return new BN(val.toString(10), 10);
    }
    if (typeof val === 'number') {
        return new BN(ensureIntNumber(val));
    }
    if (typeof val === 'string') {
        if (INT_STRING_REGEX.test(val)) {
            return new BN(val, 10);
        }
        if (isHexString(val)) {
            return new BN(ensureEvenLengthHexString(val, false), 16);
        }
    }
    throw new InvalidParamsError(`Not an integer: ${String(val)}`);
}
export function ensureParsedJSONObject(val) {
    if (typeof val === 'string') {
        return JSON.parse(val);
    }
    if (typeof val === 'object') {
        return val;
    }
    throw new InvalidParamsError(`Not a JSON string or an object: ${String(val)}`);
}
export function isBigNumber(val) {
    if (val == null || typeof val.constructor !== 'function') {
        return false;
    }
    const { constructor } = val;
    return typeof constructor.config === 'function' && typeof constructor.EUCLID === 'number';
}
//# sourceMappingURL=util.js.map