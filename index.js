const { execSync } = require('child_process');
const path = require('path');

/* eslint-disable no-console */

// Prep command executor
const exec = (command) => {
  return execSync(command, { stdio: 'inherit' });
};

// Import helpers
const print = require('./helpers/print');
const getPackageJSON = require('./helpers/getPackageJSON');
const writePackageJSON = require('./helpers/writePackageJSON');
const copyTo = require('./helpers/copyTo');

const currDir = process.env.PWD;

print.title('Initializing Harvard DCE Testing with Mocha');

// Ask user if they want to continue
console.log('\nThis will just take a moment!\n');

// Update test script
print.subtitle('Updating test script in package.json')
const newPackageJSON = getPackageJSON();
const scripts = newPackageJSON.scripts || {};
scripts.test = 'mocha --exit --reporter spec';
newPackageJSON.scripts = scripts;
writePackageJSON(newPackageJSON);
console.log('package.json updated\n');

// Create test folder
print.subtitle('Creating test/ folder');
exec('mkdir -p test');
console.log('test/ folder created\n');

// Add eslint rules
print.subtitle('Adding ESLint rules for testing');
copyTo(
  path.join(__dirname, '.eslintrc.json'),
  path.join(currDir, 'test', '.eslintrc.json')
);
console.log('/test/.eslintrc.json file create\n');

// Adding dependencies
print.subtitle('Adding dependencies');
exec('npm install --save-dev mocha');
console.log('dependencies installed\n');

print.title('Done!');

console.log('\nWrite tests in the /test folder and use "npm test" to run them');
