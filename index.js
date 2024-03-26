const crypto = require('crypto');

function base32Decode(str) {
    const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    const base32Lookup = {};
    for (let i = 0; i < base32Chars.length; i++) {
        base32Lookup[base32Chars[i]] = i;
    }
    const bytes = [];
    for (let i = 0; i < str.length; i++) {
        const char = str[i].toUpperCase();
        if (char === ' ' || char === '-') continue;
        bytes.push(base32Lookup[char]);
    }
    const decodedBytes = [];
    let bits = 0;
    let buffer = 0;
    for (let i = 0; i < bytes.length; i++) {
        buffer = (buffer << 5) | bytes[i];
        bits += 5;
        if (bits >= 8) {
            decodedBytes.push((buffer >> (bits - 8)) & 0xff);
            bits -= 8;
        }
    }
    return Buffer.from(decodedBytes);
}

module.exports = {
    generateTOTP(key, timeStep = 30, digits = 6) {
        key = base32Decode(key);
        const timestamp = Math.floor(Date.now() / 1000);
        let timeSteps = Math.floor(timestamp / timeStep);
        const timeStepsBuffer = Buffer.alloc(8);
        for (let i = 7; i >= 0; i--) {
            timeStepsBuffer[i] = timeSteps & 0xff;
            timeSteps >>= 8;
        }
        const hmacHash = crypto.createHmac('sha1', key).update(timeStepsBuffer).digest();
        const offset = hmacHash[hmacHash.length - 1] & 0x0F;
        const truncatedHash = hmacHash.slice(offset, offset + 4);
        let otpValue = truncatedHash.readUIntBE(0, truncatedHash.length) & 0x7FFFFFFF;
        const otp = (otpValue % (10 ** digits)).toString().padStart(digits, '0');
        return otp;
    }
}