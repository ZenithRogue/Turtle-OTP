# Turtle-OTP

Turtle-OTP is a simple npm package that uses only built-in node libraries to generate Time-based One-Time Passwords (TOTP) using the HMAC-based One-Time Password (HOTP) algorithm with SHA-1 hash function. I called it "turtle-otp" because I like turtles 🐢

## Installation

You can install Turtle-OTP via npm:

```bash
npm install turtle-otp
```

## Usage

```javascript
const turtleOTP = require('turtle-otp');

// Generate TOTP with a given key
const key = 'JBSWY3DPEHPK3PXP';
const otp = turtleOTP.generateTOTP(key);
console.log('OTP:', otp);
```

### Parameters

- `key`: The secret key used for generating the OTP. It should be a Base32 encoded string.
- `timeStep` (optional): The time step interval in seconds. Default is 30 seconds.
- `digits` (optional): The number of digits in the OTP. Default is 6 digits.

## Example

```javascript
const turtleOTP = require('turtle-otp');

// Generate TOTP with a key and custom parameters
const key = 'JBSWY3DPEHPK3PXP';
const timeStep = 60; // 1 minute time step
const digits = 6; // 6-digit OTP
const otp = turtleOTP.generateTOTP(key, timeStep, digits);
console.log('OTP:', otp);
```

## Credits

Turtle-OTP is developed by https://github.com/ZenithRogue

## License

This project is licensed under the MIT License.