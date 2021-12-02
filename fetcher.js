const fs = require('fs');
const readline = require('readline');
const request = require('request');
const args = process.argv.slice(2);
const link = args[0];
const path = args[1];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(link, (error, response, body) => {
  if (error === null) {
    fs.exists(path, (bool) => {
      if (bool) {
        rl.question("File already exists. Overwrite? Y/N ", answer => {
          if (answer.toLowerCase() === 'y') {
            write(path, body);
            rl.close();
          } else {
            process.exit();
          }
        });
      } else {
        write(path, body);
        rl.close();
      }
    });
  } else if (error.code === 'ENOTFOUND') {
    console.log(`Invalid link: ${error.hostname}`);
    process.exit();
  }
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
});

const write = function(mypath, mybody) {
  fs.writeFile(mypath, mybody, err => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log(`${err.path} does not exist.`);
      } else {
        console.error(err);
      }
      return;
    }
    console.log(`Downloaded and saved ${mybody.length} bytes to ${mypath}`);
  });
};